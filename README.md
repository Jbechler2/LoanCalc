# Loan Calculator Demo
I built this loan calculator over the course of 4 days as a technical demonstration to showcase my ability to quickly ramp up on React patterns after coming from Vue.

This app can be used as a basic loan calculator and comparison tool. It allows users to enter the basic details of a loan, see some relevant details, save the loan for future reference, and compare saved loans side-by-side. 

## Technical Decisions

I chose to use Typescript for this project. I'm comfortable working in this language and prefer to have type-checking over vanilla Javascript.

Before starting this project, I set out to avoid prop drilling as much as possible. My goal was to get into the habit of centralizing state management and clearly separating the displays from the data. I spent an hour or so designing the basic interfaces and functionality I wanted, and built my context to reflect those features.

Typically when I'm analyzing loan details, it means there is a longer-term decision in the works, and I rarely make the decision after a single session. I wanted the user to be able to come back and view previously saved loans, to keep them from having to enter the same data repeatedly. Using AsyncStorage, I was able to easily provide cross-platform persistence for both android and web.


## Future Improvements
There are a few features that I could see adding to this project in the future:
- Graphs/Viz - Pie charts showing interest vs principal, and side-by-side amortization schedule comparisons
- Extra Payment Calculations - View the effects of one-time or monthly additional payments
- Desktop Support - While the app is functional on desktop, I would build platform-specific layouts for a better desktop UX


## Setup Instructions
After cloning the project, run `npm install`. Then run `npm run web` or `npm run android` to view the application.

Build errors can typically be resolved by updating your Node.js version.

### Requirements
- Node.js v20