import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { Loader } from "src/components/Loader/Loader";




describe("Loader", () => {
    it("renders correctly", () => {
        const screen = render(<Loader />)
        expect(screen).toMatchSnapshot();
    })

})