import random


def sort(a, aux, low, high):
    if(high <= low):
        return

    mid = low + (high - low) // 2
    sort(a, aux, low, mid)
    sort(a, aux, mid+1, high)
    merge(a, aux, low, mid, high)


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


def mergeSort(array):
    low = 0
    high = len(array) - 1

    aux = array.copy()

    mid = low + (high-low)//2
    sort(array, aux, low, mid)
    sort(array, aux, mid+1, high)
    merge(array, aux, low, mid, high)
    print(array)


if (__name__ == '__main__'):
    myArray = [random.randint(1, 1000) for i in range(100)]
