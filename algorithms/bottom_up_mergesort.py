# not recursive implementation of mergesort
import random
import time


def insertionSort(array, low, high):
    for i in range(low+1, high + 1):
        left = i - 1
        key = array[i]
        while (left >= low and array[left] > key):
            array[left + 1] = array[left]
            left -= 1
        array[left + 1] = key


def bottomUpMergeSort(array):
    def merge(a, aux, low, mid, high):
        for i in range(low, high+1):
            aux[i] = a[i]
        x = low
        y = mid+1

        for j in range(low, high+1):
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

    n = len(array)
    length = 7
    # improved with InsertionSort (sorts in subarrays of size 7)
    for low in range(0, n-length, length+length):
        insertionSort(array, low, min(low+length+length-1, n-1))

    aux = array.copy()
    while (length < n):
        for low in range(0, n-length, length+length):
            merge(array, aux, low, low+length-1, min(low+length+length-1, n-1))
        length *= 2


if (__name__ == '__main__'):

    results = []

    for i in range(10):
        myArray = [random.randint(1, 1000000) for i in range(100000)]
        copy1 = myArray.copy()
        copy1.sort()
        start = time.time()
        bottomUpMergeSort(myArray)
        print(myArray == copy1)
        results.append(time.time() - start)

    print(sum(results)/len(results))
