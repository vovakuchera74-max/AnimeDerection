import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AnimeCard } from '../components/AnimeCard';

const mockAnime = {
  mal_id: 1,
  title: 'Naruto',
  score: 8.5,
  episodes: 220,
  type: 'TV',
  year: 2002,
  images: {
    jpg: {
      image_url: 'test.jpg',
      large_image_url: 'test-large.jpg',
    },
  },
};

describe('AnimeCard', () => {
  it('рендериться з правильним заголовком', () => {
    render(
      <BrowserRouter>
        <AnimeCard anime={mockAnime} />
      </BrowserRouter>
    );
    expect(screen.getByText('Naruto')).toBeInTheDocument();
  });

  it('показує тип аніме', () => {
    render(
      <BrowserRouter>
        <AnimeCard anime={mockAnime} />
      </BrowserRouter>
    );
    expect(screen.getByText('TV')).toBeInTheDocument();
  });

  it('показує рік', () => {
    render(
      <BrowserRouter>
        <AnimeCard anime={mockAnime} />
      </BrowserRouter>
    );
    expect(screen.getByText('2002')).toBeInTheDocument();
  });
});
