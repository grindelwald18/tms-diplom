export interface IBookInfo {
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
}

export interface IBooksLIst {
    list: IBookInfo[],
    isLoading: boolean,
    error: string | null,
}