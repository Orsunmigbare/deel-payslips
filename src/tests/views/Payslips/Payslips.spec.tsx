import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { useMockFetch } from "src/hooks/useMockFetch";
import Payslips from "src/views/Payslips/Payslips";
import { sampleSlips } from "./data";

jest.mock("../../../hooks/useMockFetch", () => (
    {
        useMockFetch: jest.fn()
    }
));

afterEach(() => {
    jest.resetAllMocks();
});

describe("Payslips", () => {
    it("renders correctly", () => {
        (useMockFetch as jest.Mock).mockReturnValue({ loading: false, data: sampleSlips });
        const screen = render(<Payslips />);
        sampleSlips.forEach((slip, i) => {
            const durationText = `Payslip for ${new Date(slip.fromDate).toDateString()} to ${new Date(slip.toDate).toDateString()}`
            expect(screen.getByText(durationText)).toBeInTheDocument();
            expect(screen.getAllByAltText('payslip')[i]).toHaveAttribute("src", slip.file);
            expect(document.querySelectorAll("ion-item")[i]).toHaveAttribute("href", `/payslip/${slip.id}`)
        })
        expect(screen).toMatchSnapshot()
    })
})