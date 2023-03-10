export const onlyInLeft = (left, right, compareFn) =>
    left.filter((leftValue) => !right.some((rightValue) => compareFn(leftValue, rightValue)));
