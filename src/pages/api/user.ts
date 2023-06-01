import { NextApiRequest, NextApiResponse } from 'next';

const fakeUser = {
  id: 1,
  username: 'islam',
  email: 'isla.asankojoev@mail.ru',
  is_author: true,
  access: 'access_token',
  refresh: 'refresh_token',
};

// Создаем парсер для данных в формате JSON
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Применяем парсер к телу запроса
    res.status(200).json(fakeUser);
  } else {
    // Обрабатываем другие методы запроса
    res.status(405).json({ message: 'Метод не разрешен' });
  }
}
