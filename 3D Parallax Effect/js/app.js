//move the images according to the mouse pointer 
const parallax_el=document.querySelectorAll(".parallax");
const main= document.querySelector("main");

let xValue = 0, yValue = 0;
let rotateDegree=0;

function update (cursorPosition) {
     //Node-list
    parallax_el.forEach((el) => {
            let speedx = el.dataset.speedx;
            let speedy = el.dataset.speedy;
            let speedz = el.dataset.speedz;
            let rotateDegree = el.dataset.rotate;

            let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
            let zVAlue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1 ;
            
            //This checks whether the cursor pointer is on left or right enabling us to chnage z-value on the opp. side
            //zvalue makes the image move front or back
            //left is 1 and right is -1
            el.style.transform = `translateX(calc(-50% + ${xValue * speedx}px)) 
            rotateY(${rotateDegree * rotateDegree}deg) translateY(calc(-50% + ${yValue * speedy}px)) 
            perspective(2300px) translateZ(${zVAlue * speedz}px)`;


        });

}

update(0)

window.addEventListener("mousemove", (e)=> {

    if(timeline.isActive()) return; //below code runs only after the start animation of elements coming up
            
    xValue = e.clientX - window.innerWidth/2;  //innerWidth/2 will give the mouse coordinates wrt to the center of the screen 
    yValue = e.clientY - window.innerHeight /2;
       
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
});

if(window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
}
else{
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}
/* GSAP ANimation for the text */

let timeline = gsap.timeline();

Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) => {
    timeline.from(
        el,
        {
        // top: `${el.offsetHeight / 2 + el.dataset.distance}px`,/*To start from bottom with 200px*/
        top: `calc(100vh + ${el.dataset.distance}px)`,
        duration: 3.5,
        ease: "power3.out",
    },
    "1"
    );
});

timeline.from(".text h2",{
    y:window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
    duration:2,
},
"2.5"/*Runs after 2.5 secs after the website page loads*/
);

timeline.from(".text h1",{
    y:-150,
    opacity: 0,
    duration: 1.5,

},
"3"
);

timeline.from(".hide",{
    opacity:0,
    duration:1.5,
},
"3"
);
