let visualisation = {};

let init = () => {		
    let container = d3.select(".container");

    visualisation.width = container.node().offsetWidth;
    visualisation.height = container.node().offsetHeight;
    
    let gX = null,
        gY = null,
        currentTransform = (visualisation.zoom != undefined)? visualisation.zoom : {k:1, x:0, y:0},
        svg = container.append('svg')
            .attr('height', visualisation.height)
            .attr('width', visualisation.width);

    let hover_gradient = svg.append('defs')
        .append('radialGradient')
        .attr('cx', '50%')
        .attr('cy', '0%')
        .attr('fx', '50%')
        .attr('fy', '0%')
        .attr('r', '100%')
        .attr('gradientTransform', 'translate(0.5,0),scale(0.1,1),rotate(90),scale(.5,5),translate(-0.5,0)')
        .attr('id', 'hoverGradient');

    hover_gradient.append('stop')
        .attr('stop-color', '#D03AB0')
        .attr('offset', '0%');

    hover_gradient.append('stop')
        .attr('stop-color', '#D03AB0')
        .attr('stop-opacity', '0')
        .attr('offset', '100%');

    let xScale = d3.scaleLinear()
        .domain([-visualisation.width / 2, visualisation.width / 2])
        .range([0, visualisation.width]);

    let yScale = d3.scaleLinear()
        .domain([-visualisation.height / 2, visualisation.height / 2])
        .range([visualisation.height, 0]);

    let xAxis = d3.axisBottom(xScale)
        .ticks((visualisation.width + 2) / (visualisation.height + 2) * 10)
        .tickSize(visualisation.height)
        .tickPadding(8 - visualisation.height);

    let yAxis = d3.axisRight(yScale)
        .ticks(10)
        .tickSize(visualisation.width)
        .tickPadding(8 - visualisation.width);

    gX = svg.append("g")
        .attr("class", "axis axis--x")
        .call(xAxis);

    gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    let view = svg.append("g")
        .attr("class", "view");

    adj_layer = view.append("g");
    
    adj_layer.append("g")
        .attr('class', 'nodes');
    
    adj_layer.append("g")
        .attr('class', 'links');

    visualisation.drag = d3.drag()
        .subject((d) => { return d; })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    layers_draw_dagre();

    adj_layer.attr("transform", 'translate(' + (visualisation.width / 2 - visualisation.left_offset) + ' ' + (visualisation.height / 2 - visualisation.top_offset) + ')');
    setTimeout(() => {
        view.classed("ready", true);
    }, 700);

    let zoom = d3.zoom()
        .scaleExtent([0.25, 2])
        .translateExtent([
            [-visualisation.width * 4, -visualisation.height * 4],
            [visualisation.width * 4 * 1.5, visualisation.height * 4 * 1.5]
        ])
        .on("zoom", zoomed)
        .on('start', () => {
            svg.classed('transforming', true);
        })
        .on('end', () => {
            svg.classed('transforming', false);
        });

    function zoomed() {
        currentTransform = d3.event.transform;
        visualisation.zoom = currentTransform;
        
        view.attr("transform", currentTransform);
        gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
    }

    svg.call(zoom)
        .call(zoom.transform, d3.zoomIdentity.translate(currentTransform.x, currentTransform.y).scale(currentTransform.k));

    function check_connection(from_key) {
        d3.select('.nodes').selectAll('g.layer').classed("disabled", false);
    
        let disabled_nodes = [from_key];
    
        visualisation.data[0].forEach((layer, to_key) => {
            visualisation.data[1].forEach((l, k) => {
                if(
                    (l.source == from_key && l.target == to_key) || 
                    (l.source == to_key && l.target == from_key)
                ){
                    disabled_nodes.push(to_key);
                }
            });
        });
    
        d3.select('.nodes')
            .selectAll('g.layer')
            .data(visualisation.data[0])
            .filter((d, key) => { return (disabled_nodes.includes(key)) })
            .classed("disabled", true);
    }

    function dragstarted(d, key, data) {
        visualisation.drag_starter = d3.select(this);
        visualisation.drag_type = (visualisation.drag_starter.classed("link_in"))? "in" : "out";
        check_connection(key);

        d3.event.sourceEvent.stopPropagation();
        visualisation.drag_line = adj_layer.append('line')
            .attr('stroke', '#D03AB0')
            .attr("stroke-width", 2)
            .attr("pointer-events", "none")
            .attr("stroke-dasharray", "10,5")
            .attr('x1', d.node.x)
            .attr('y1', (visualisation.drag_type === 'out') ? d.node.y + parseFloat(visualisation.drag_starter.attr('y')) : d.node.y - parseFloat(visualisation.drag_starter.attr('y')))
            .attr('x2', d3.event.x + d.node.x)
            .attr('y2', d3.event.y + d.node.y);
    }

    function dragged(d, key, data) {
        visualisation.drag_line
            .attr('x2', d3.event.x + d.node.x)
            .attr('y2', d3.event.y + d.node.y);
    }

    function dragended(d, from_key, data) {
        let target = document.elementFromPoint(d3.event.sourceEvent.clientX, d3.event.sourceEvent.clientY).parentNode;
        if(target.classList.contains('layer')){
            target.classList.add('target');

            d3.select('.nodes').selectAll('g.layer').data(visualisation.data[0])
            .classed("target", (d, key, data) => {
                if(d3.select(data[key]).classed('target') && !d3.select(data[key]).classed('disabled')){
                    add_connection(visualisation.drag_type, from_key, key);
                }
                return false;
            });
        }

        visualisation.drag_starter = undefined;
        visualisation.drag_type = undefined;
        visualisation.drag_line.remove();
    }
};

function add_connection(type, from_key, to_key){
    if(type === 'out'){
        visualisation.data[1].push({
            source: from_key,
            target:	to_key
        });
    }else{
        visualisation.data[1].push({
            source: to_key,
            target:	from_key
        });
    }
    layers_draw_dagre(true);
}

function layers_draw_dagre(animate){
    // Create the renderer
    let render = new dagreD3.render();

    render.shapes().action = function(parent, bbox, node) {
        let w = 220,
            h = 40,
            points = [
                {x:  0, y:   0},
                {x:  w, y:   0},
                {x:  w, y:  -h},
                {x:  0, y:  -h}
            ];
            
            shapeSvg = parent.html("").insert("polygon", ":first-child")
                .attr("points", points.map(function(d) { return d.x + "," + d.y; }).join(" "))
                .attr("transform", "translate(" + (-w/2) + "," + (h/2) + ")");
      
        node.intersect = function(point) {
            return dagreD3.intersect.polygon(node, points, point);
        };
        node.w = w;
        node.h = h;
      
        return shapeSvg;
    };
    
    render.shapes().condition = function(parent, bbox, node) {
        let w = 220,
            h = 40,
            points = [
                {x:  0, y:   -h/2},
                {x:  w/12, y:   0},
                {x:  w-w/12, y:   0},
                {x:  w, y:  -h/2},
                {x:  w-w/12, y:  -h},
                {x:  w/12, y:   -h}
            ];
            
            shapeSvg = parent.html("").insert("polygon", ":first-child")
                .attr("points", points.map(function(d) { return d.x + "," + d.y; }).join(" "))
                .attr("transform", "translate(" + (-w/2) + "," + (h/2) + ")");
      
        node.intersect = function(point) {
            return dagreD3.intersect.polygon(node, points, point);
        };
        node.w = w;
        node.h = h;
      
        return shapeSvg;
    };

    // Create a new directed graph
    let g = new dagreD3.graphlib.Graph().setGraph({});

    // Automatically label each of the nodes
    visualisation.data[0].forEach((l, k) => {
        g.setNode(k, {shape: l.type, label: l.id, key:k}); 
    });

    // Set up the edges
    visualisation.data[1].forEach((l, k) => {
        g.setEdge(l.source, l.target, { label: "", curve: d3.curveCardinal.tension(.9), key: k});
    });

    let dagre_svg = d3.select(".dagre-container svg");
    let dagre_inner = dagre_svg.select("g");
    dagre_inner.html('');

    // Set the rankdir
    g.graph().rankdir = "UD"; //up -> down
    g.graph().nodesep = 10; //horizontal margin
    g.graph().ranksep = 80; //vertical margin

    // Run the renderer. This is what draws the final graph.
    render(dagre_inner, g);

    visualisation.data[0].forEach((node, key) => {
        visualisation.data[0][key].node = g._nodes[key];
    });
    
    let edgeKeys = Object.keys(g._edgeLabels);
    visualisation.data[1].forEach((link, key) => {
        let arrow = g._edgeLabels[edgeKeys[key]];
        
        let arrow_obj = d3.select(arrow.elem),
            path_center = Math.ceil(arrow.points.length / 2) - 1;

        let remove = arrow_obj.append('g')
            .attr('class', 'remove')
            .attr('title', 'Remove link')
            .attr('data-key', arrow.key)
            .attr("transform", "translate(" + (arrow.points[path_center].x + 0.5) + "," + arrow.points[path_center].y + ")");

        remove.append("circle")
            .attr("r", 9)
            .attr("fill", "#fff");

        remove.append("text")
            .attr("class", "fa")
            .attr('font-size', '14')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .attr("fill", "#000")
            .attr("y", -.5)
            .text('\u2716');
    });

    visualisation.top_offset = (g._label.height) ? g._label.height/2 : 0;
    visualisation.left_offset = (g._label.width) ? g._label.width/2 : 0;
    
    if(animate != undefined && animate === true){
        animate_nodes();
        update_links(true);
    }else{
        process_nodes();
        update_links();
    }

    dagre_inner.html('');
}

function process_nodes(){
    console.log(visualisation.data[0]);
    let u = d3.select('.nodes')
        .selectAll('g.layer')
        .data(visualisation.data[0]);

    let nodes = u.enter()
        .append('g')
        // .call(drag)
        .attr('class', (d) => {
            return 'layer '+d.type;
        })
    
    nodes.attr("transform", (d) => {
        if(d.node.x == undefined) d.node.x = 0;
        if(d.node.y == undefined) d.node.y = 0;
        return 'translate(' + d.node.x + ' ' + d.node.y + ')';
    });

    let nodes_actions = nodes.filter(d => d.type == "action"),
        nodes_conditions = nodes.filter(d => d.type == "condition");
    
    nodes_actions.append("rect")
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("x", d => -d.node.w/2)
        .attr("y", d => -d.node.h/2)
        .attr("width", d => d.node.w)
        .attr("height", d => d.node.h)
        .attr("fill", '#fff')
        .attr("fill-opacity", .3)
        .attr("stroke", '#fff')
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 2);

    let conditions_polygons = nodes_conditions.html((d) => {
        return d.node.elem.innerHTML;
    }).select('polygon');

    conditions_polygons.attr("fill", '#fff')
        .attr("fill-opacity", .3)
        .attr("stroke", '#fff')
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 2);

    nodes.append("rect")
        .attr("class", "make_link link_in")
        .attr("x", d => (d.type === 'condition')? -d.node.w/2 + d.node.w/12 : -d.node.w/2)
        .attr("y", d => d.node.h/2)
        .attr("width", d => (d.type === 'condition')? d.node.w - d.node.w/12*2 : d.node.w)
        .attr("height", d => d.node.h/2)
        .attr("transform", "rotate(180)")
        .attr("fill", 'url(#hoverGradient)')
        .call(visualisation.drag);

    nodes.append("rect")
        .attr("class", "make_link link_out")
        .attr("x", d => (d.type === 'condition')? -d.node.w/2 + d.node.w/12 : -d.node.w/2)
        .attr("y", d => d.node.h/2)
        .attr("width", d => (d.type === 'condition')? d.node.w - d.node.w/12*2 : d.node.w)
        .attr("height", d => d.node.h/2)
        .attr("fill", 'url(#hoverGradient)')
        .call(visualisation.drag);

    nodes.append("text")
        .text(d => d.label)
        .attr('alignment-baseline', 'central')
        .attr('text-anchor', 'middle')

    u.exit().remove();
};

function animate_nodes(){
    d3.select('.container .nodes')
        .selectAll('g.layer')
        .data(visualisation.data[0])
        .attr("transform", (d) => {
            if(d.node.x == undefined) d.node.x = 0;
            if(d.node.y == undefined) d.node.y = 0;
            return 'translate(' + d.node.x + ' ' + d.node.y + ')';
        });
    d3.select('.container g.view > g')
        .attr("transform", 'translate(' + (visualisation.width / 2 - visualisation.left_offset) + ' ' + (visualisation.height / 2 - visualisation.top_offset) + ')');
    update_links(true);
};

function update_links(latency){
    let links_container = d3.select(".container svg g.links");
    links_container.classed('hide', true);
    links_container.html(d3.select(".dagre-container svg g.edgePaths").html());
    links_container.selectAll(".remove")
        .data(visualisation.data[1])
        .on("click", (d, key) => {
            visualisation.data[1].splice(key, 1);
            layers_draw_dagre(true);
        });

    setTimeout(() => {
        links_container.classed('hide', false);
    }, (latency != undefined && latency === true)? 300 : 0);
}

function loadJSON(path, callback){   
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);  
}

function get_data(path){
    return new Promise((resolve, reject) => {
        loadJSON(path, (response) => {
            resolve(response);
        });
    });
} 

Promise.all([
    get_data('./json/data.json'),
    get_data('./json/link.json')
]).then((data) => { 
    visualisation['data'] = data;
    init();
});

// document.addEventListener("DOMContentLoaded", () => {
//     let adder = document.querySelector(".add");
//     document.querySelector(".add .opener").addEventListener("click", (e) => {
//         if(!adder.classList.contains('opened')){
//             adder.classList.add('opened');
//         }else{
//             adder.classList.remove('opened');
//         }
//     });
// }); 

window.addEventListener( 'resize', () => {
    d3.select(".container").html('');
    init();
}, false );