import * as math from 'mathjs';
import next from 'next';

// ? formula logic
// * the loop is dependent to the number of iterations
// * at first iteration: 
// * first guess value is used to find the first point user defined function output
// * second guess value is used to find the second point user defined function output
// * first and second point user defined output will be used to find the next point using the secant formula
// * 
// * then the next point will always be assigned to second point on following iterations

// ? can number of iterations and accuracy be both provided the user? if yes, find a logic that satisfies that
// ? in part 2, are we only tasked to use one method for finding the root of user defined function?
// ? in part 1, we only have to implement two methods, one of them is bisection, do we have to choose for the second one? it makes sense to use the assigned method (?) for part 2

// ? part 1:
// ? predefined function from previous machine problem - ln(x + 1)
// ? use bisection and secant.
// ? when user selected iterative approach, show c,f(c),
// ? when user selected error propagated approach, show number of iteration before reaching the approximated root.
// ? part 2:
// ? user defined function
// ? same shit from part 1

// ! todo: review for refactoring

function rootFindSecant({userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations, tolerance}) {
  // makes the array one-based index
  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();

  let firstPointScope = {
    x: firstGuessPoint,
  }

  let secondPointScope = {
    x: secondGuessPoint,
  }

  const firstIteration = ({
    iteration: 1,
    firstPoint: firstGuessPoint,
    secondPoint: secondGuessPoint,
    firstPointOutput: executableFunction.evaluate(firstPointScope),
    secondPointOutput: executableFunction.evaluate(secondPointScope),
  })
  
  firstIteration.nextPoint = firstIteration.secondPoint - ((firstIteration.secondPointOutput * (firstIteration.secondPoint - firstIteration.firstPoint))/(firstIteration.secondPointOutput - firstIteration.firstPointOutput))

  let nextPointScope = {
    x: firstIteration.nextPoint
  }

  firstIteration.nextPointOutput = executableFunction.evaluate(nextPointScope)

  result.push(firstIteration);

  for (let i = 2; i <= numberOfIterations; ++i) {
    // reassignment will execute first, index - 1
      const nextIteration = {
        iteration: i,
        firstPoint: result[i - 1].secondPoint,
        secondPoint: result[i - 1].nextPoint,
      }

      firstPointScope = {
        x: nextIteration.firstPoint,
      }
      
      secondPointScope = {
        x: nextIteration.secondPoint,
      }

      nextIteration.firstPointOutput = executableFunction.evaluate(firstPointScope)
      nextIteration.secondPointOutput = executableFunction.evaluate(secondPointScope)

      nextIteration.nextPoint = nextIteration.secondPoint - ((nextIteration.secondPointOutput * (nextIteration.secondPoint - nextIteration.firstPoint))/(nextIteration.secondPointOutput - nextIteration.firstPointOutput))

      nextPointScope = {
        x: nextIteration.nextPoint
      }
      
      nextIteration.nextPointOutput = executableFunction.evaluate(nextPointScope)
      
      result.push(nextIteration);
      
      if (math.abs(nextIteration.firstPoint - nextIteration.secondPoint) < tolerance ) break;
    }
  return result;
}

const exampleSecantInput = {
  userFunction: '3x^3-x-1',
  firstGuessPoint: -1,
  secondGuessPoint: 1,
  numberOfIterations: 20,
  tolerance: 0.0001
}

export default function testSecant() {
  console.log(rootFindSecant(exampleSecantInput));
}
