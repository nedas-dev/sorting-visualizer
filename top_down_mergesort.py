import random
import time
# Recursive implementation of mergesort


def insertionSort(array, low, high):
    for i in range(low+1, high + 1):
        left = i - 1
        key = array[i]
        while (left >= low and array[left] > key):
            array[left + 1] = array[left]
            left -= 1
        array[left + 1] = key


def sort(a, aux, low, high):
    if (high <= low + 7 + 1):
        insertionSort(a, low, high)
        return

    if(high <= low):
        return

    mid = low + (high - low) // 2
    sort(a, aux, low, mid)
    sort(a, aux, mid + 1, high)
    merge(a, aux, low, mid, high)


def merge(a, aux, low, mid, high):
    for i in range(low, high + 1):
        aux[i] = a[i]

    x = low
    y = mid + 1
    if (aux[mid] <= aux[mid + 1]):
        return

    for j in range(low, high + 1):
        if (x > mid):
            a[j] = aux[y]
            y += 1
        elif (y > high):
            a[j] = aux[x]
            x += 1
        elif (aux[x] < aux[y]):
            a[j] = aux[x]
            x += 1
        else:
            a[j] = aux[y]
            y += 1


def mergeSort(array):
    low = 0
    high = len(array) - 1

    aux = array.copy()

    mid = low + (high - low) // 2
    sort(array, aux, low, mid)
    sort(array, aux, mid + 1, high)
    merge(array, aux, low, mid, high)


if (__name__ == '__main__'):
    results = []
    for i in range(10):
        myArray = [random.randint(1, 1000000) for i in range(100000)]
        copy1 = myArray.copy()
        copy2 = myArray.copy()
        copy1.sort()
        start = time.time()
        mergeSort(copy2)
        total = time.time() - start
        results.append(total)
        print(copy1 == copy2)
    print(sum(results) / len(results))
