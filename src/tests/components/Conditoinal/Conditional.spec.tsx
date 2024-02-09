import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { Conditional } from 'src/components/Conditional/Conditional';
import { conditionalProps } from './data';



describe("Conditional", () => {

    it("renders Loader component if loading props is true and data is falsy", () => {
        const props = { ...conditionalProps, loading: true, }
        const { getByAltText, queryByText } = render(<Conditional {...props} />)
        expect(getByAltText("loader")).toBeInTheDocument();
        expect(queryByText("Children")).not.toBeInTheDocument();
    })

    it("renders Loader component if loading props is true and data is truthy", () => {
        const props = { ...conditionalProps, loading: true, data: 5 }
        const { getByAltText, queryByText } = render(<Conditional {...props} />)
        expect(getByAltText("loader")).toBeInTheDocument();
        expect(queryByText("Children")).not.toBeInTheDocument();
    })

    it("renders children  if loading props is false and data is truthy", () => {
        const props = { ...conditionalProps, loading: false, data: 5 }
        const { queryByAltText, queryByText } = render(<Conditional {...props} />)
        expect(queryByAltText("loader")).not.toBeInTheDocument();
        expect(queryByText("Children")).toBeInTheDocument();
    })

})