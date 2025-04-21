const container = document.querySelector("#container");
const newPad = document.querySelector("#newPad");
let size = 16;

newPad.addEventListener("click", () => {
    size = prompt("Number of Grid per Side (0< x <= 100)");
    if (size>100 || size<=0 || isNaN(size)==true) {
        alert("Wrong Input");
        return;
    }
    const root = document.querySelector(":root");
    let rootStyles = getComputedStyle(root);
    let padSize = rootStyles.getPropertyValue("--padSize").trim();
    root.style.setProperty("--gridSize", `calc(${padSize}/${+size})`);
    createGrid(size);
});

function createGrid(num) {
    container.textContent = "";
    let grid = undefined;
    for (let i = 0; i<num; i++) {
        for (let j = 0; j<num; j++) {
            grid = document.createElement("div");
            grid.classList.add("grid", `grid${i+"_"+j}`);
            container.appendChild(grid);
            eventListenerAddition(grid);
        }
    }      
}

function eventListenerAddition(grid) {
    const gridNum = document.querySelector(`.${grid.classList[1]}`);
    gridNum.setAttribute("style", "--darkness: 1; filter: brightness(var(--darkness)); --mouseLeave: true;");
    gridNum.addEventListener("mouseover", () => adjustDarkness(gridNum, "mouseEnter"));
    gridNum.addEventListener("mouseenter", () => adjustDarkness(gridNum, "mouseEnter"));
    gridNum.addEventListener("mouseleave", () => adjustDarkness(gridNum, "mouseLeave"));
}

function adjustDarkness(grid, event) {
    let gridStyles = getComputedStyle(grid);
    let mouseLeave = gridStyles.getPropertyValue("--mouseLeave");
    if (event === "mouseEnter") {
        grid.style.setProperty("--mouseLeave","false");
    }
    else if (mouseLeave === "false") {
        let darkness = gridStyles.getPropertyValue("--darkness");
        darkness = Math.round(((darkness>0)?darkness-0.1:0)*10)/10;
        grid.style.setProperty("--darkness",`${darkness}`);
        grid.style.setProperty("--mouseLeave","true");
    }
}

createGrid(size);