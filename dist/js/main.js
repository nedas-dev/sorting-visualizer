const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const visualizer = document.getElementById('visualizer');
const visualizerContainer = visualizer.querySelector('div.container')
const startBtn = document.querySelector('button.start')
const selectBtn = document.querySelector('select.algorithm')
const speedInput = document.querySelector('input.speed')
const arraySizeInput = document.querySelector('input.size')

const BLUE = 'blue';
const LIGHTBLUE = 'rgb(107, 131, 227)'
const LIGHTRED = 'rgb(255, 131, 131)'
const RED = 'rgb(235, 56, 16)'
const SELECTION = 'selection'
const INSERTION = 'insertion'
const START = 'START'
const CANCEL = 'CANCEL'

class SortVisualizer {
    constructor(size) {
        this.size = size;
        this.algorithm = SELECTION
        this.items = []
        this.speed = 1
        this.sorting = false
    }

    createRandomSortItems() {
        this.items = []
        const allItems = visualizerContainer.getElementsByClassName('item')
        while (allItems.length > 0) {
            allItems[0].remove()
        }
        for (let i = 0; i < this.size; i++) {
            let itemDiv = document.createElement('div')
            let sortDiv = document.createElement('div')

            itemDiv.className = `item`
            sortDiv.className = `sort`;

            let randInt = (Math.random() * 100).toFixed(2);

            sortDiv.style.height = `${randInt}%`;
            this.items.push(randInt)
            // while hover a sort item shows the value of it
            let infoSpan = document.createElement('span')
            infoSpan.className = `infoSpan visible${i}`
            infoSpan.style.visibility = 'hidden'
            infoSpan.textContent = `${randInt}`
            itemDiv.appendChild(infoSpan)
            let triangleSpan = document.createElement('span')
            triangleSpan.className = `triangle visible${i}`
            triangleSpan.style.visibility = 'hidden'
            itemDiv.appendChild(triangleSpan)
            // END - while hover a sort item shows the value of it
            itemDiv.appendChild(sortDiv)
            visualizerContainer.appendChild(itemDiv)
        }
    }

    selectionSort() {
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            for (let i = 0; i < this.size; i++) {
                let minVal = this.items[i]
                var currentItem = allItems[i]
                var compareItem = null
                currentItem.style.backgroundColor = RED //almost solid red for current number
                let minValItemIndex = null
                await sleep(150 * this.speed)
                for (let j = i + 1; j < this.size; j++) {
                    if (this.sorting == false) {
                        return
                    }
                    let currentItemInner = allItems[j]
                    currentItemInner.style.backgroundColor = BLUE // blue for searching color
                    await sleep(100 * this.speed)
                    currentItemInner.style.backgroundColor = LIGHTBLUE // blue for back to normal after search was done for an element
                    if (minVal > this.items[j]) {
                        minVal = this.items[j]
                        minValItemIndex = j
                        if (compareItem != null) {
                            compareItem.style.backgroundColor = LIGHTBLUE // when found new min value change old min value color back to normal
                        }
                        var compareItem = allItems[j]
                        compareItem.style.backgroundColor = LIGHTRED // update new min value color

                    }

                }
                // swap with the smallest value that found and update its' colors
                if (minValItemIndex != null) {
                    compareItem.style.backgroundColor = LIGHTBLUE
                    // swap height values
                    currentItem.style.height = `${this.items[minValItemIndex]}%`
                    compareItem.style.height = `${this.items[i]}%`
                    let temp = this.items[i]
                    // swap (update) the values in our local list
                    this.items[i] = this.items[minValItemIndex]
                    this.items[minValItemIndex] = temp
                }
                currentItem.style.backgroundColor = BLUE // blue
            }
            startBtn.textContent = START
        }
        runSlowDown()
    }
    insertionSort() {
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            allItems[0].style.backgroundColor = BLUE
            for (let i = 1; i < this.size; i++) {
                await sleep(150 * this.speed)
                for (let j = i; j > 0; j--) {
                    if (this.sorting == false) {
                        return
                    }
                    let currentItemInner = allItems[j]
                    currentItemInner.style.backgroundColor = LIGHTRED
                    await sleep(100 * this.speed)
                    if (this.items[j - 1] > this.items[j]) {
                        let currentNeigborItem = allItems[j - 1]
                        currentNeigborItem.style.backgroundColor = LIGHTRED
                        if (j - 1 == 0) {
                            currentNeigborItem.style.backgroundColor = BLUE
                        }
                        currentNeigborItem.style.height = `${this.items[j]}%`
                        currentItemInner.style.backgroundColor = BLUE
                        currentItemInner.style.height = `${this.items[j - 1]}%`
                        let temp = this.items[j]
                        this.items[j] = this.items[j - 1]
                        this.items[j - 1] = temp
                    }
                    else {
                        currentItemInner.style.backgroundColor = BLUE
                        break
                    }
                }
            }
            startBtn.textContent = START
        }
        runSlowDown()
    }

}

// START and CANCEL buttons (start sorting and stop sorting functions)
startBtn.addEventListener('click', function (e) {
    e.preventDefault()

    if (e.target.textContent == START) {
        sortVisualizer.sorting = true
        e.target.textContent = CANCEL

        if (sortVisualizer.algorithm == INSERTION) {
            sortVisualizer.insertionSort()
        }
        else if (sortVisualizer.algorithm == SELECTION) {
            sortVisualizer.selectionSort()
        }
    }
    else if (e.target.textContent == CANCEL) {
        sortVisualizer.sorting = false
        e.target.textContent = START
        sortVisualizer.createRandomSortItems()
    }
})

// Event listener for changing the sorting algorithm
selectBtn.addEventListener('change', function (e) {
    if (e.target.value == SELECTION) {
        sortVisualizer.algorithm = SELECTION
    }
    else if (e.target.value == INSERTION) {
        sortVisualizer.algorithm = INSERTION
    }
})

// Event listener for changing sort speed
speedInput.addEventListener('change', function (e) {
    sortVisualizer.speed = 1 - e.target.value / 80
})

// Event listener for changing array size
arraySizeInput.addEventListener('change', function (e) {
    sortVisualizer.size = e.target.value
    sortVisualizer.createRandomSortItems()
})

// -------------- hover over sort elements for value info -----------
visualizer.addEventListener('mouseover', function (e) {
    if (e.target.className == 'sort') {
        let childrenNodes = e.target.parentElement.childNodes
        childrenNodes[0].style.visibility = 'visible'
        childrenNodes[1].style.visibility = 'visible'
    }
})

visualizer.addEventListener('mouseout', function (e) {
    if (e.target.className == 'sort') {
        let childrenNodes = e.target.parentElement.childNodes
        childrenNodes[0].style.visibility = 'hidden'
        childrenNodes[1].style.visibility = 'hidden'
    }
})
// ------------------------------------------------------------


sortVisualizer = new SortVisualizer(50);

window.onload = sortVisualizer.createRandomSortItems()
