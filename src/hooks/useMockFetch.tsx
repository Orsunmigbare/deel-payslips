import { useState, useEffect } from "react";
import { fetchPayslip, fetchPayslips } from "utilities/mockAPI"


type MockFetchState = {
    loading: boolean;
    data?: any
}

export const useMockFetch = (type: string, id?: string) => {
    const [state, setState] = useState<MockFetchState>({
        loading: false,
    })

    const fetchData = async (type: string) => {
        setState({ ...state, loading: true })
        let response;
        if (type === "payslip" && id) {
            response = await fetchPayslip(id);
        } else {
            response = await fetchPayslips()
        }
        setState({ loading: false, data: response.data })
    }

    useEffect(() => {
        fetchData(type)
    }, [])

    return {
        loading: state.loading,
        data: state.data
    }
}