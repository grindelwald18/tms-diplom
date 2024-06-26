export interface IBookInfo {
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    isLike?: boolean
    isReade?: boolean
}

export interface IMAXBookInfo {
  item: {},
  isLoading: boolean,
  error: string | null,
}

export interface IBooksLIst {
    list: IBookInfo[],
    isLoading: boolean,
    error: string | null,
    limit: number,
    pagesCount: number | null
}

export interface IBookPreview {
  error?: string
  title?: string
  subtitle?: string
  authors?: string
  publisher?: string
  isbn10?: string
  isbn13?: string
  pages?: string
  year?: string
  rating?: string
  desc?: string
  price?: string
  image?: string
  url?: string
  name?: string
  message?: string
  isFavorite?: boolean
}
