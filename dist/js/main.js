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
const GREEN = 'green'
const GREY = 'grey'
const BLACK = 'black'
const SELECTION = 'SELECTION'
const INSERTION = 'INSERTION'
const SHELLSORT = 'SHELLSORT'
const MERGESORT = 'MERGESORT'
const MERGESORTNOTRECURSIVE = 'MERGESORT-NOT-RECURSIVE'
const QUICKSORT = 'QUICKSORT'
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

    mergeSort() {
        async function sort(a, aux, low, high, counter, colors) {
            if (sortVisualizer.sorting == false) {
                return
            }
            if (high <= low) {
                return
            }

            let mid = low + Math.floor((high - low) / 2)
            await sort(a, aux, low, mid, counter, colors)
            await sort(a, aux, mid + 1, high, counter, colors)
            await merge(a, aux, low, mid, high, counter, colors)
        }
        async function merge(a, aux, low, mid, high, counter, colors) {
            for (let i = low; i <= high; i++) {
                aux[i] = a[i]
            }
            let x = low
            let y = mid + 1
            if (counter[0] == 2) {
                counter[0] = 0
            }
            for (let k = low; k <= mid; k++) {
                allItems[k].style.backgroundColor = colors[counter]
            }
            counter[0] += 1
            for (let k = mid + 1; k <= high; k++) {
                allItems[k].style.backgroundColor = colors[counter]
            }
            counter[0] += 1
            for (let j = low; j <= high; j++) {
                if (sortVisualizer.sorting == false) {
                    return
                }
                if (x > mid) {
                    a[j] = aux[y]
                    allItems[j].style.height = `${aux[y]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[y]}`

                    y += 1
                }
                else if (y > high) {
                    a[j] = aux[x]
                    allItems[j].style.height = `${aux[x]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[x]}`
                    x += 1
                }
                else if (aux[x] < aux[y]) {
                    a[j] = aux[x]
                    allItems[j].style.height = `${aux[x]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[x]}`
                    x += 1
                }
                else {
                    a[j] = aux[y]
                    allItems[j].style.height = `${aux[y]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[y]}`
                    y += 1
                }
                await sleep(150 * sortVisualizer.speed)
            }
        }
        this.disableButtonsWhenSortingOn()
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            let low = 0
            let high = this.size - 1
            let aux = [...this.items]
            let counter = [0]
            let colors = [GREY, BLACK]
            let mid = low + Math.floor((high - low) / 2)
            await sort(this.items, aux, low, mid, counter, colors)
            await sort(this.items, aux, mid + 1, high, counter, colors)
            await merge(this.items, aux, low, mid, high, counter, colors)
            for (let i = 0; i < this.size; i++) {
                allItems[i].style.backgroundColor = BLUE
            }
            startBtn.textContent = START
            this.enableButtonsWhenSortingOff()
        }
        runSlowDown()
    }

    mergeSortNotRecursive() {
        async function merge(a, aux, low, mid, high, counter, colors) {
            for (let i = low; i <= high; i++) {
                aux[i] = a[i]
            }
            let x = low
            let y = mid + 1
            if (counter[0] == 2) {
                counter[0] = 0
            }

            for (let j = low; j <= high; j++) {
                if (sortVisualizer.sorting == false) {
                    return
                }
                if (x > mid) {
                    a[j] = aux[y]
                    allItems[j].style.height = `${aux[y]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[y]}`
                    y += 1
                }
                else if (y > high) {
                    a[j] = aux[x]
                    allItems[j].style.height = `${aux[x]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[x]}`
                    x += 1
                }
                else if (aux[x] < aux[y]) {
                    a[j] = aux[x]
                    allItems[j].style.height = `${aux[x]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[x]}`

                    x += 1
                }
                else {
                    a[j] = aux[y]
                    allItems[j].style.height = `${aux[y]}%`
                    allItems[j].parentElement.childNodes[0].textContent = `${aux[y]}`
                    y += 1
                }
                // for better visualization on which array element / piece we are currently working (light red color)
                allItems[j].style.backgroundColor = LIGHTRED
                await sleep(250 * sortVisualizer.speed)

            }
            // Each time change the color for better visualization (black/grey switching)
            for (let k = low; k <= high; k++) {
                allItems[k].style.backgroundColor = colors[counter]
            }
            counter[0] += 1
        }
        this.disableButtonsWhenSortingOn()
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            let counter = [0]
            let colors = [GREY, BLACK]

            let n = this.size
            let aux = [...this.items]

            for (let len = 1; len < n; len *= 2) {
                for (let low = 0; low < n - len; low += len + len) {
                    if (sortVisualizer.sorting == false) {
                        return
                    }
                    await merge(this.items, aux, low, low + len - 1, Math.min(low + len + len - 1, n - 1), counter, colors)
                }
            }

            for (let i = 0; i < this.size; i++) {
                allItems[i].style.backgroundColor = BLUE
            }
            startBtn.textContent = START
            this.enableButtonsWhenSortingOff()
        }
        runSlowDown()
    }

    quickSort() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        function swap(a, i, j) {
            let temp = a[i]
            a[i] = a[j]
            a[j] = temp
        }

        async function sort(a, low, high) {
            if (sortVisualizer.sorting == false) {
                return
            }
            if (high <= low) {
                return
            }
            for (let i = low; i <= high; i++) {
                allItems[i].style.backgroundColor = GREY
            }
            let j = await partition(a, low, high)
            await sort(a, low, j - 1)
            await sort(a, j + 1, high)
        }
        async function partition(a, low, high) {
            let i = low
            let j = high + 1
            let divider = a[low]
            allItems[low].style.backgroundColor = RED
            while (true) {
                if (sortVisualizer.sorting == false) {
                    return
                }
                do {
                    i += 1
                    allItems[i].style.backgroundColor = LIGHTRED
                    await sleep(180 * sortVisualizer.speed)

                    if (i == high) {
                        break
                    }
                } while (a[i] < divider)

                do {
                    j -= 1
                    allItems[j].style.backgroundColor = BLACK
                    await sleep(180 * sortVisualizer.speed)
                    if (j == low) {
                        break
                    }
                } while (a[j] > divider)

                if (i >= j) {
                    break
                }
                // Update the sort element heights
                allItems[i].style.height = `${a[j]}%`
                allItems[j].style.height = `${a[i]}%`
                // allItems[i].style.backgroundColor = BLACK
                // allItems[j].style.backgroundColor = LIGHTRED

                // Update the sort element's hover info (size of the sort element)
                allItems[j].parentElement.childNodes[0].textContent = a[i]
                allItems[i].parentElement.childNodes[0].textContent = a[j]
                swap(a, i, j)

                await sleep(180 * sortVisualizer.speed)

            }
            // Update the sort element heights
            allItems[low].style.height = `${a[j]}%`
            allItems[j].style.height = `${a[low]}%`
            // Update the sort element's hover info (size of the sort element)
            allItems[low].parentElement.childNodes[0].textContent = a[j]
            allItems[j].parentElement.childNodes[0].textContent = a[low]

            allItems[i].style.backgroundColor = LIGHTRED
            allItems[j].style.backgroundColor = BLACK
            let partitionerIndex = j
            swap(a, low, j)

            await sleep(180 * sortVisualizer.speed)
            for (let index = 0; index <= sortVisualizer.size - 1; index++) {
                allItems[index].style.backgroundColor = LIGHTBLUE
            }
            return j
        }
        this.disableButtonsWhenSortingOn()
        const allItems = visualizerContainer.getElementsByClassName('sort');
        const runSlowDown = async () => {
            let low = 0
            let high = this.size - 1
            await sort(this.items, low, high)
            for (let index = 0; index <= sortVisualizer.size - 1; index++) {
                allItems[index].style.backgroundColor = BLUE
                await sleep(5)
            }
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
        else if (sortVisualizer.algorithm == MERGESORT) {
            sortVisualizer.mergeSort()
        }
        else if (sortVisualizer.algorithm == MERGESORTNOTRECURSIVE) {
            sortVisualizer.mergeSortNotRecursive()
        }
        else if (sortVisualizer.algorithm == QUICKSORT) {
            sortVisualizer.quickSort()
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
    else if (e.target.value == MERGESORT) {
        sortVisualizer.algorithm = MERGESORT
    }
    else if (e.target.value == MERGESORTNOTRECURSIVE) {
        sortVisualizer.algorithm = MERGESORTNOTRECURSIVE
    }
    else if (e.target.value == QUICKSORT) {
        sortVisualizer.algorithm = QUICKSORT
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