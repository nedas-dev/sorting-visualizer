#  implementation of quick sort
import random
import time


def swap(a, i, j):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp


def sort(a, low, high):
    if (high <= low):
        return
    j = partition(a, low, high)
    sort(a, low, j-1)
    sort(a, j+1, high)


def partition(a, low, high):
    i = low
    j = high + 1
    divider = a[low]

    while (True):
        while True:
            i += 1
            if (i == high):
                break
            if (a[i] > divider):
                break

        while True:
            j -= 1
            if (j == low):
                break
            if (a[j] < divider):
                break

        if (i >= j):
            break
        swap(a, i, j)

    swap(a, low, j)
    return j


def quickSort(array):
    random.shuffle(array)
    low = 0
    high = len(array) - 1
    sort(array, low, high)


if (__name__ == '__main__'):
    results = []
    for i in range(10):
        myArray = [random.randint(1, 1000000) for i in range(100000)]
        copy1 = myArray.copy()
        copy2 = myArray.copy()
        copy1.sort()
        start = time.time()
        quickSort(copy2)
        total = time.time() - start
        results.append(total)
        print(copy1 == copy2)
    print(sum(results) / len(results))
