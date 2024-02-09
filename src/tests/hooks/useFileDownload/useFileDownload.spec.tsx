import { renderHook, act } from "@testing-library/react";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from "@capacitor-community/file-opener"
import { useFileDownload } from "hooks/useFileDownload";
import { Capacitor } from "@capacitor/core";
import * as FileDownload from "utilities/fileDownload";

jest.mock("@capacitor/core", () => (
    {
        ...(jest.requireActual("@capacitor/core")),
        Capacitor: {
            isNativePlatform: jest.fn()
        }
    }
))

jest.mock("@capacitor/filesystem", () => (
    {
        ...(jest.requireActual("@capacitor/filesystem")),
        Filesystem: {
            writeFile: jest.fn()
        }
    }
))

jest.mock("@capacitor-community/file-opener", () => (
    {
        FileOpener: {
            open: jest.fn()
        }
    }
))

afterEach(() => {
    jest.resetAllMocks();
});

describe("useFileDownload", () => {
    const url = "./sampleUrl",
        filename = "sampleFile",
        sampleBase64 = "sampleBase64",
        localFilePath = "./sampleLocalPath";

    it("successfully downloads file on a native platform", async () => {
        const { result } = renderHook(() => useFileDownload());
        const onComplete = jest.fn();
        (FileDownload.base64FromPath as jest.Mock) = jest.fn().mockReturnValue(sampleBase64);
        (Capacitor.isNativePlatform as jest.Mock).mockReturnValue(true);
        (Filesystem.writeFile as jest.Mock).mockReturnValue({ uri: localFilePath })

        await act(() => result.current.download(url, filename, onComplete));
        expect(FileDownload.base64FromPath).toHaveBeenCalledWith(url);
        expect(Filesystem.writeFile).toHaveBeenCalledWith(expect.objectContaining({
            path: filename,
            data: sampleBase64,
            directory: Directory.Data
        }));
        expect(FileOpener.open).toHaveBeenCalledWith(expect.objectContaining({ filePath: localFilePath }));
        expect(onComplete).toHaveBeenCalled();
    })

    it("downloads opens file url in a new tab on web", async () => {
        const { result } = renderHook(() => useFileDownload());
        const onComplete = jest.fn();
        (FileDownload.downloadFile as jest.Mock) = jest.fn();
        (Capacitor.isNativePlatform as jest.Mock).mockReturnValue(false);

        await act(() => result.current.download(url, filename, onComplete));
        expect(FileDownload.downloadFile).toHaveBeenCalledWith(url, filename);

    })
})