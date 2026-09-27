import React from 'react';

const imageModules = import.meta.glob('../assets/img{1,2,3,4,5}.*', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

const designs = [1, 2, 3, 4, 5]
    .map((number) => {
        const image = Object.entries(imageModules).find(([path]) =>
            new RegExp(`img${number}\\.[^/]+$`).test(path),
        );

        return image ? { number, src: image[1] } : undefined;
    })
    .filter((design): design is { number: number; src: string } => Boolean(design));

export const DesignsPage: React.FC = () => (
    <section style={{ padding: '2rem' }}>
        <h1>Designs</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {designs.map(({ number, src }) => (
                <img
                    key={number}
                    src={src}
                    alt={`MEDiTRACK design ${number}`}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            ))}
        </div>
    </section>
);