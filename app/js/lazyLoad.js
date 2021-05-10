function preloadImage(img){
    const srcset = img.dataset.srcset;
    if(!srcset)
        return;
    img.srcset = srcset;
}

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 300px 0px"
        };
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if(!entry.isIntersecting)
                return;
            else{
                preloadImage(entry.target);
                imageObserver.unobserve(entry.target);
                entry.target.classList.remove("lazy");
            }
        });
      }, imgOptions);
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
        const rootMarginBottom = 300;
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
      
        function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop + rootMarginBottom)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })



/*___Intersection Observer to lazy load images___*/

// const images = document.querySelectorAll("[data-src]");




// const imgObserver = new IntersectionObserver((entries, imgObserver) => {
//     entries.forEach(entry => {
        
//     });
// }, imgOptions);

// images.forEach(img => {
//     imgObserver.observe(img);
// });

/*___Intersection Observer to fade in the content in the viewport___*/

const elts = document.querySelectorAll('.fadein');
const eltsOptions = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px"
};

const eltObserver = new IntersectionObserver((entries, eltObserver) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting)
            return;
        if(entry.intersectionRatio > 0){
            entry.target.style.animation = "fadeIn 0.6s ease-out";
            entry.target.style.opacity = 1;
        }
        else{
            entry.target.style.animation = "none";
            entry.target.classList.remove('fadein');
        }
    });
}, eltsOptions);

elts.forEach(elt => eltObserver.observe(elt));