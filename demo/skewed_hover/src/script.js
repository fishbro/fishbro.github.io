$(document).ready(function(){
    if($('.mega-menu .table-menu').length){ //funny skewed menu ^^
        /**
         * Рандомное число в заданном диапазоне
         * @param  {[int]} min минимальное значение
         * @param  {[int]} max максимальное значение
         * @param  {[int]} num кратное число
         */
        function randomInteger(min,max,num) {
            return Math.floor(Math.floor(Math.random()*(max-min+1)+min) / num) * num;
        }

        /**
         * Применяем трансформацию скашивания к элементу
         * @param  {[obj]}  el трансформирующийся элемент
         */
        function skewThis(el){
            skewDeg = randomInteger(-20,20,1)+'deg';
            $(el).css({
                '-webkit-transform' : 'skewX(' + skewDeg + ')',
                '-moz-transform'    : 'skewX(' + skewDeg + ')',
                '-ms-transform'     : 'skewX(' + skewDeg + ')',
                '-o-transform'      : 'skewX(' + skewDeg + ')',
                'transform'         : 'skewX(' + skewDeg + ')'
            });
        }

        /**
         * Получаем координаты и ширину элемента
         * @param  {[obj]} elem элемент
         * @return {[obj]}      координаты и ширина
         */
        function floatMenuGetDementions(elem){
            return {
                'top' : $(elem).position().top,
                'left' : $(elem).position().left-39,
                'width' : $(elem).width()+78,
            }
        }

        /**
         * Проверяем, есть ли активный элемент, если есть, имитируем наведение мыши на него, если нет прячем плавающий блок
         */
        function floatMenuInit(){
            if($('td.menu-item.active').length){
                $('td.menu-item.active').mouseenter();
            }else{
                $(".float-bg").removeClass('show');
            }
        }

        /**
         * По наведению мыши применяем трансформации к плавающему блоку
         */
        function floatMenuHover(){
            $('.table-menu td').mouseenter(function(){
                $(".float-bg").addClass('show').css(floatMenuGetDementions($(this)));
                skewThis($(".float-bg .decor-l"));
                skewThis($(".float-bg .decor-r"));
            });
        }

        floatMenuHover();
        setTimeout(function(){ //wait for end other menu animation
            floatMenuInit();
        } ,500);

        $('.mega-menu .table-menu table').mouseleave(function(){
            floatMenuInit();
        });
    }
});
