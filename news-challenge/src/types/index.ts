export type Story = {
    id: string,
    headline: string,
    standfirst: string,
    date: {
        created: Date,
        custom: Date,
        live: Date,
        processed: Date,
        updated: Date
    },
    thumbnail: string,
    link: {
        canonical: string
    }
}