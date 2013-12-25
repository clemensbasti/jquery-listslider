(function($) {

    $.fn.listslider = function (options) {
        var settings = $.extend({}, $.fn.listslider.defaults, options);
        var numberOfChildren;
        var el;
        var currentPosition;
        var interval;
        
        function slideLi (newPosition) {
        
            var element = el.find('li:nth-child('+ currentPosition +')');
            var elementDiv = el.find('li:nth-child('+ currentPosition +') div');
        
            switch(settings.animationType) {
                case 'swing':
                    element.hide(settings.animationSpeed);
                    elementDiv.hide(settings.animationSpeed);
                    break;
                case 'linear':
                    element.hide(settings.animationSpeed, 'linear');
                    elementDiv.hide(settings.animationSpeed, 'linear');
                    break;
                case 'fade':
                default:
                    element.fadeOut(settings.animationSpeed);
                    elementDiv.fadeOut(settings.animationSpeed);
                    break;
            }
            
            if(newPosition === undefined) {
                currentPosition += 1;
            } else {
                currentPosition = newPosition;
            }
            
            if(currentPosition > numberOfChildren) {
                currentPosition = 1;
            }
            
            if(currentPosition < 1) {
                currentPosition = numberOfChildren;
            }
            
            element = el.find('li:nth-child('+ currentPosition +')');
            elementDiv = el.find('li:nth-child('+ currentPosition +') div');

            switch(settings.animationType) {
                case 'swing':
                    element.show(settings.animationSpeed);
                    elementDiv.delay(settings.divDelay).show(settings.animationSpeed);
                    break;
                case 'linear':
                    element.show(settings.animationSpeed, 'linear');
                    elementDiv.delay(settings.divDelay).show(settings.animationSpeed, 'linear');
                    break;
                case 'fade':
                default:
                    element.fadeIn(settings.animationSpeed);
                    elementDiv.delay(settings.divDelay).fadeIn(settings.animationSpeed);
                    break;
            }
         }
         
         function navigate () {
            $this = $(this);
            
            clearInterval(interval);
            newPosition = $this.parent().index('.slider-pagination') + 1;
            slideLi(newPosition);
            interval = setInterval(slideLi, settings.slideSpeed);
            
            return false;
         }
         
         function prevClick () {
            clearInterval(interval);
            slideLi(currentPosition -1);
            interval = setInterval(slideLi, settings.slideSpeed);
         }
         
         function nextClick () {
            clearInterval(interval);
            slideLi(currentPosition +1);
            interval = setInterval(slideLi, settings.slideSpeed);
         }
        
        return this.each(function() {
            var $this = $(this);
            numberOfChildren = $this.children().length;
            el = $this;
            currentPosition = settings.startPosition;
            
            $this.find('li').css('display', 'none');
            $this.find('li:first-child').css('display', 'block');
            
            $this.find('li div').css('display', 'none');
            $this.find('li:first-child div').css('display', 'block');
            
            if (settings.showPagination) {
                var listString = '';
                for(var i = 1; i <= numberOfChildren; i++) {
                    listString += '<li><a href="#">'+ i +'</a></li>';
                }
                $this.after('<ul class="slider-pagination">'+ listString + '</ul>');
                $('.slider-pagination a').click(navigate);
            }
            
            if (settings.showControls) {
                $this.after('<a href="#" id="nextSlide">Next</a>');
                $this.after('<a href="#" id="prevSlide">Prev</a>');
                $('#prevSlide').click(prevClick);
                $('#nextSlide').click(prevClick);
            }
            
            interval = setInterval(slideLi, settings.slideSpeed);
        });
    };
    
    // DEFAULT SETTINGS
    $.fn.listslider.defaults = {
        
        // position where the slider starts
        startPosition: 1,
        // Speed of slide animations
        animationSpeed: 'slow',
        // time between each element
        slideSpeed: 3000,
        // type of image animation, use fade|swing|linear
        animationType: 'fade',
        // optional Prev|Next Buttons
        showControls: true,
        // optional slide pagination
        showPagination: true,
        // delay till show div
        divDelay: 'slow'
    };
})(jQuery);