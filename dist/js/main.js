const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const visualizer = document.getElementById('visualizer');
const visualizerContainer = visualizer.querySelector('div.container')
const startBtn = document.querySelector('button.start')
const selectBtn = document.querySelector('select.algorithm')
const speedInput = document.querySelector('input.speed')
const arraySizeInput = document.querySelector('input.size')
const generateNewArrayBtn = document.querySelector('button.generate')


const BLUE = 'blue';
const LIGHTBLUE = 'rgb(107, 131, 227)'
const LIGHTRED = 'rgb(255, 131, 131)'
const RED = 'rgb(235, 56, 16)'
const SELECTION = 'SELECTION'
const INSERTION = 'INSERTION'
const SHELLSORT = 'SHELLSORT'
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
        // Delete old sort elements
        this.items = []
        const sortItems = visualizerContainer.getElementsByClassName('item')
        while (sortItems.length > 0) {
            sortItems[sortItems.length - 1].remove()
        }
        // END - Delete old sort elements
        for (let i = 0; i < this.size; i++) {
            let itemDiv = document.createElement('div')
            let sortDiv = document.createElement('div')

            itemDiv.className = `item`
            sortDiv.className = `sort`;

            let randInt = parseFloat((Math.random() * 100).toFixed(2));

            sortDiv.style.height = `${randInt}%`;
            this.items.push(randInt)

            // when HOVERED sort element - its' value appears
            let infoSpan = document.createElement('span')
            infoSpan.className = `infoSpan`
            infoSpan.style.visibility = 'hidden'
            infoSpan.textContent = `${randInt}`
            itemDiv.appendChild(infoSpan)
            let triangleSpan = document.createElement('span')
            triangleSpan.className = `triangle`
            triangleSpan.style.visibility = 'hidden'
            itemDiv.appendChild(triangleSpan)
            // END - when HOVERED sort element - its' value appears

            itemDiv.appendChild(sortDiv)
            visualizerContainer.appendChild(itemDiv)
        }
    }

    selectionSort() {
        this.disableButtonsWhenSortingOn()
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
                    // swap (update) the values in our local array
                    this.items[i] = this.items[minValItemIndex]
                    this.items[minValItemIndex] = temp
                    // update the infoSpan value (when hovered sort element)
                    currentItem.parentElement.childNodes[0].textContent = `${this.items[i]}`
                    compareItem.parentElement.childNodes[0].textContent = `${this.items[minValItemIndex]}`
                }
                currentItem.style.backgroundColor = BLUE // blue
            }
            startBtn.textContent = START
            this.enableButtonsWhenSortingOff()
        }
        runSlowDown()
    }
    insertionSort() {
        this.disableButtonsWhenSortingOn()
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
                    // if item to the left is bigger swap them
                    if (this.items[j - 1] > this.items[j]) {
                        let currentNeigborItem = allItems[j - 1]
                        currentNeigborItem.style.backgroundColor = LIGHTRED
                        // fixed bug (first element did not change the color after sorting)
                        if (j - 1 == 0) {
                            currentNeigborItem.style.backgroundColor = BLUE
                        }
                        currentNeigborItem.style.height = `${this.items[j]}%`
                        currentItemInner.style.height = `${this.items[j - 1]}%`
                        currentItemInner.style.backgroundColor = BLUE
                        let temp = this.items[j]
                        this.items[j] = this.items[j - 1]
                        this.items[j - 1] = temp
                        // update the infoSpan value (when hovered sort element)
                        currentItemInner.parentElement.childNodes[0].textContent = `${this.items[j]}`
                        currentNeigborItem.parentElement.childNodes[0].textContent = `${this.items[j - 1]}`
                    }
                    else {
                        currentItemInner.style.backgroundColor = BLUE
                        break
                    }
                }
            }
            startBtn.textContent = START
            this.enableButtonsWhenSortingOff()
        }
        runSlowDown()
    }

    shellSort() {
        this.disableButtonsWhenSortingOn()
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            const n = this.size
            let h = 1
            while (h < Math.floor(n / 3)) {
                h = 3 * h + 1
            }
            let hElement = document.querySelector('p.h')
            hElement.style.display = 'block'
            hElement.textContent = `h = ${h}`
            while (h >= 1) {
                hElement.textContent = `h = ${h}`
                for (let i = h; i < n; i++) {
                    await sleep(100 * this.speed)
                    allItems[i].style.backgroundColor = RED
                    for (let j = i; j >= h; j -= h) {
                        if (this.sorting == false) {
                            hElement.style.display = 'None'
                            return
                        }
                        allItems[j].style.backgroundColor = RED
                        allItems[j - h].style.backgroundColor = LIGHTRED
                        await sleep(100 * this.speed)
                        allItems[j].style.backgroundColor = LIGHTBLUE
                        allItems[j - h].style.backgroundColor = LIGHTBLUE
                        if (this.items[j - h] > this.items[j]) {
                            await sleep(100 * this.speed)
                            allItems[j - h].style.height = `${this.items[j]}%`
                            allItems[j].style.height = `${this.items[j - h]}%`

                            // update the infoSpan value (when hovered sort element)
                            allItems[j].parentElement.childNodes[0].textContent = `${this.items[j - h]}`
                            allItems[j - h].parentElement.childNodes[0].textContent = `${this.items[j]}`

                            let temp = this.items[j]
                            this.items[j] = this.items[j - h]
                            this.items[j - h] = temp
                        }
                        else {
                            break
                        }


                    }
                    allItems[i].style.backgroundColor = LIGHTBLUE


                }
                h = Math.floor(h / 3)
            }
            for (let i = 0; i < this.size; i++) {
                await sleep(10)
                if (i > Math.floor(this.size / 2)) {
                    break
                }
                allItems[i].style.backgroundColor = BLUE
                allItems[this.size - 1 - i].style.backgroundColor = BLUE
            }
            hElement.style.display = 'None'
            startBtn.textContent = START
            this.enableButtonsWhenSortingOff()
        }
        runSlowDown()
    }

    disableButtonsWhenSortingOn() {
        arraySizeInput.disabled = true
        generateNewArrayBtn.disabled = true
        selectBtn.disabled = true
    }

    enableButtonsWhenSortingOff() {
        arraySizeInput.disabled = false
        generateNewArrayBtn.disabled = false
        selectBtn.disabled = false
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
        else if (sortVisualizer.algorithm == SHELLSORT) {
            sortVisualizer.shellSort()
        }
    }
    else if (e.target.textContent == CANCEL) {
        sortVisualizer.sorting = false
        e.target.textContent = START
        sortVisualizer.enableButtonsWhenSortingOff()
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
    else if (e.target.value == SHELLSORT) {
        sortVisualizer.algorithm = SHELLSORT
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

        e.target.parentElement.style.opacity = '0.7'

    }
})

visualizer.addEventListener('mouseout', function (e) {
    if (e.target.className == 'sort') {
        let childrenNodes = e.target.parentElement.childNodes
        childrenNodes[0].style.visibility = 'hidden'
        childrenNodes[1].style.visibility = 'hidden'

        e.target.parentElement.style.opacity = '1'
    }
})
// ------------------------------------------------------------


sortVisualizer = new SortVisualizer(50);

window.onload = sortVisualizer.createRandomSortItems()