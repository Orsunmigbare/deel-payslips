import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { Card } from 'components/Card/Card';
import { SampleProps } from './data';


describe("Card", () => {
    it("renders correctly", () => {
        const screen = render(<Card {...SampleProps} />);
        expect(screen).toMatchSnapshot()
    })
    it("passes the right props", () => {
        const { getAllByText, getByAltText } = render(<Card {...SampleProps} />);
        const textContainingDate = `Payslip for ${new Date(SampleProps.fromDate).toDateString()} to ${new Date(SampleProps.toDate).toDateString()}`
        expect(getAllByText(textContainingDate)).toHaveLength(2);
        expect(getByAltText("payslip")).toHaveAttribute("src", SampleProps.file);
        expect(document.querySelector("ion-item")).toHaveAttribute("href", `/payslip/${SampleProps.id}`)
    })
})