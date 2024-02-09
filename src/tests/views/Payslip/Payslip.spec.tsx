import "@testing-library/jest-dom"
import { render, fireEvent } from '@testing-library/react';
import { useFileDownload } from "hooks/useFileDownload";
import { useMockFetch } from "hooks/useMockFetch";
import Payslip from "views/Payslip/Payslip";
import { sampleSlip } from "./data";
import { useParams } from 'react-router';


jest.mock("react-router", () => (
    {
        ...(jest.requireActual("react-router")),
        useParams: jest.fn()
    }
))
jest.mock("../../../hooks/useFileDownload", () => (
    {
        ...(jest.requireActual("../../../hooks/useFileDownload")),
        useFileDownload: jest.fn()
    }
))
jest.mock("../../../hooks/useMockFetch", () => (
    {
        ...(jest.requireActual("../../../hooks/useMockFetch")),
        useMockFetch: jest.fn()
    }
));


afterEach(() => {
    jest.resetAllMocks();
});
describe("Payslip", () => {
    it("renders correctly", () => {
        (useMockFetch as jest.Mock).mockReturnValue({ loading: false, data: sampleSlip });
        (useParams as jest.Mock).mockReturnValue({ id: sampleSlip.id });
        (useFileDownload as jest.Mock).mockReturnValue({
            download: jest.fn(),
            loading: false
        });
        const idTitle = `Payslip ID : ${sampleSlip.id}`,
            durationTitle = `Duration : ${new Date(sampleSlip.fromDate).toDateString()} - ${new Date(sampleSlip.toDate).toDateString()}`

        const screen = render(<Payslip />);
        expect(screen.getByText(idTitle)).toBeInTheDocument();
        expect(screen.getByText(durationTitle)).toBeInTheDocument();
        expect(screen.getByAltText("payslip")).toHaveAttribute("src", sampleSlip.file);
        expect(screen).toMatchSnapshot()
    });

    it("calls useFileDownload.download when the download button is clicked", () => {
        (useMockFetch as jest.Mock).mockReturnValue({ loading: false, data: sampleSlip });
        (useParams as jest.Mock).mockReturnValue({ id: sampleSlip.id });
        (useFileDownload as jest.Mock).mockReturnValue({
            download: jest.fn(),
            loading: false
        });
        const filename = `${new Date(sampleSlip.fromDate).toDateString()}-${new Date(sampleSlip.toDate).toDateString()}.png`
        const { getByText } = render(<Payslip />);
        fireEvent.click(getByText("Download Payslip"));
        expect(useFileDownload().download).toHaveBeenCalledTimes(1);
        expect(useFileDownload().download).toHaveBeenCalledWith(sampleSlip.file, filename, expect.any(Function), expect.any(Function));
    })
})