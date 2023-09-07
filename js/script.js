const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function frontpageani(){
    let tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease : Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        delay: -1,
        duration: 2,
        stagger: .2
    })
    .from("#frontPageFooter", {
        opacity: 0,
        y: -10,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1.8
    })
}

function mousescew(){
    clearTimeout(timeout);

    var scalex = 1;
    var scaley = 1;
    
    var prevx = 0;
    var prevy = 0;
    window.addEventListener("mousemove", function(dets){
        scalex = gsap.utils.clamp(0.7,1.3, dets.clientX-prevx);
        scaley = gsap.utils.clamp(0.7,1.3, dets.clientY-prevy);

        prevx = dets.clientX;
        prevy = dets.clientY;

        movemousepointer(scalex, scaley);

        timeout = setTimeout(function(){
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function movemousepointer(scalex, scaley){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${scalex}, ${scaley})`;
    })
}

movemousepointer();
frontpageani();
mousescew();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotdiff = 0;
    var rot = 0;

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0, 
            ease: Power4,
        });
    });

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        // Rotation
        rotdiff = dets.clientX - rot;
        rot = dets.clientX;

        // const mid1 = (elem.querySelector("img").getBoundingClientRect().height)/2;
        // const mid2 = (elem.querySelector("img").getBoundingClientRect().width)/2;
        console.log(diff);
        gsap.to(elem.querySelector("img"), {
            opacity: 1, 
            ease: Power4,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-14, 14, rotdiff*0.5),
        });
    });
});