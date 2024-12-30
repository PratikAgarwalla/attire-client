import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Dark Grey Shades */
  --dark-grey-1: #000000;  /* Black */
  --dark-grey-2: #1a1a1a;  /* Very Dark Grey */
  --dark-grey-3: #333333;  /* Dark Grey */
  --dark-grey-4: #4d4d4d;  /* Mid Dark Grey */
  --dark-grey-5: #666666;  /* Light Dark Grey */
  --dark-grey-6: #f6f6f4;

  /* White Shades */
  --white-1: #ffffff;      /* White */
  --white-2: #f2f2f2;      /* Very Light Grey */
  --white-3: #e6e6e6;      /* Light Grey */
  --white-4: #cccccc;      /* Mid Light Grey */
  --white-5: #b3b3b3;      /* Soft Light Grey */
}

::-webkit-scrollbar {
  display: none;
}
    
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html{
    font-size: 62.5%;
}

body{
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: #000000;
    background-color: #ffffff;
    line-height: 1.6;

}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', serif;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
}


h1, h2, h3, h4,
button, input, label {
  line-height: 1.1;
}

a:not([class]) {
  text-decoration: none;
  color: currentColor;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input, button,
textarea, select {
  font-family: inherit;
  font-size: inherit;
}

textarea:not([rows]) {
  min-height: 10em;
}
`;

export default GlobalStyles;
