const activitiesLinks = document.getElementsByClassName("activities__link");

for(var i = 0; i < activitiesLinks.length; i++){
    activitiesLinks[i].addEventListener('click', (e)=>{
        document.getElementsByClassName('activities__link--active')[0].classList.remove("activities__link--active");
        document.getElementsByClassName('activities__img--active')[0].classList.remove("activities__img--active");
        document.getElementsByClassName('activities__text--active')[0].classList.remove("activities__text--active");
        
        e.target.classList.add('activities__link--active');
        document.getElementById(e.target.id + "-img").classList.add('activities__img--active');
        document.getElementById(e.target.id + "-text").classList.add('activities__text--active');
    });
}