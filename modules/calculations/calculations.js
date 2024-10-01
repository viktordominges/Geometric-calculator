// Function to handle the calculation of perimeter and area based on figure data
// Parameters:
// - figureData: an object containing selectors for perimeter, area, inputs, and a function for calculations
export function calculate(figureData) {
    const { perimeterSelector, areaSelector, inputs, calculateFn } = figureData; // Destructure the data
    const resultPerimeter = document.querySelector(perimeterSelector);  // Element to display perimeter result
    const resultArea = document.querySelector(areaSelector);            // Element to display area result
    let inputData = {};  // Object to store input values for calculations

    // Function to calculate and update the total perimeter and area based on user input
    function calcTotal() {
        const result = calculateFn(inputData);  // Call the calculation function with the current input data
        if (result) {
            // If a valid result is returned, update the perimeter and area in the UI
            resultPerimeter.textContent = result.perimeter;
            resultArea.textContent = result.area;
        } else {
            // If inputs are missing or invalid, display placeholder values
            resultPerimeter.textContent = '____';
            resultArea.textContent = '____';
        }
    }

    calcTotal();  // Initial calculation when the page loads

    // Add event listeners to each input field to update values and recalculate on input
    inputs.forEach(({ selector, property }) => {
        const input = document.querySelector(selector);  // Get the input element
        input.addEventListener('input', () => {
            // Validate if the input contains non-numeric characters
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";  // Highlight invalid input
            } else {
                input.style.border = 'none';  // Clear border if input is valid
                inputData[property] = +input.value;  // Store valid input in inputData
            }
            calcTotal();  // Recalculate the results after each input
        });
    });
}

// Function to initialize the calculations for various geometric figures
export function initializeCalculations() {
    // Data for each figure (square, rectangle, triangle, circle)
    // Defines input fields, selectors for results, and the calculation functions
    const figures = {
        square: {
            perimeterSelector: '#result_square_perimeter',
            areaSelector: '#result_square_area',
            inputs: [{ selector: '#square_side', property: 'side' }],  // Only one input: side
            calculateFn: ({ side }) => side ? {
                perimeter: side * 4,          // Perimeter of a square: 4 * side
                area: side * side             // Area of a square: side * side
            } : null
        },
        rectangle: {
            perimeterSelector: '#result_rectangle_perimeter',
            areaSelector: '#result_rectangle_area',
            inputs: [
                { selector: '#rectangle_width', property: 'width' },   // Two inputs: width and height
                { selector: '#rectangle_height', property: 'height' }
            ],
            calculateFn: ({ width, height }) => (width && height) ? {
                perimeter: (width + height) * 2,  // Perimeter of a rectangle: 2 * (width + height)
                area: width * height              // Area of a rectangle: width * height
            } : null
        },
        triangle: {
            perimeterSelector: '#result_triangle_perimeter',
            areaSelector: '#result_triangle_area',
            inputs: [
                { selector: '#triangle_leg_1', property: 'leg1' },  // Two inputs: leg1 and leg2 (right triangle)
                { selector: '#triangle_leg_2', property: 'leg2' }
            ],
            calculateFn: ({ leg1, leg2 }) => (leg1 && leg2) ? {
                perimeter: leg1 + leg2 + parseFloat(Math.sqrt(leg1 ** 2 + leg2 ** 2).toFixed(1)), // Perimeter of a right triangle: leg1 + leg2 + hypotenuse
                area: (leg1 * leg2) / 2           // Area of a right triangle: (leg1 * leg2) / 2
            } : null
        },
        circle: {
            perimeterSelector: '#result_circle_perimeter',
            areaSelector: '#result_circle_area',
            inputs: [{ selector: '#radius', property: 'radius' }],  // Only one input: radius
            calculateFn: ({ radius }) => radius ? {
                perimeter: (radius * Math.PI * 2).toFixed(1),  // Circumference of a circle: 2 * π * radius
                area: (Math.PI * (radius ** 2)).toFixed(1)     // Area of a circle: π * radius^2
            } : null
        }
    };

    // Get the current figure from localStorage or default to 'square'
    const currentFigure = localStorage.getItem('figure') || 'square';

    // Check if the current figure is defined in the figures object
    if (figures[currentFigure]) {
        calculate(figures[currentFigure]);  // Calculate based on the current figure
    } else {
        console.error(`Figure "${currentFigure}" is not defined in figures.`);  // Error if figure is not found
        calculate(figures['square']);  // Default to square if figure is invalid
    }

    // Add event listeners to figure selection tabs
    document.querySelectorAll('.calculating__choose-item').forEach(tab => {
        tab.addEventListener('click', () => {
            const figureId = tab.getAttribute('id');  // Get the ID of the clicked tab (figure)
            if (figures[figureId]) {
                calculate(figures[figureId]);  // Calculate the selected figure
                localStorage.setItem('figure', figureId);  // Save the selected figure in localStorage
            } else {
                console.error(`Figure "${figureId}" is not defined in figures.`);  // Error if figure is not found
            }
        });
    });
}
