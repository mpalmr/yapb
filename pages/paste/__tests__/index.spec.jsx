import React from 'react';
import { shallow } from 'enzyme';
import { CardDeck } from 'react-bootstrap';
import CurrentUserPastes from '..';


function createFile(file = {}) {
  return {
    id: 'mockFileId',
    name: 'mockFileName',
    contents: 'mockFileContents',
    updatedAt: new Date('2000-02-20').toISOString(),
    ...file,
  };
}

function createPaste(paste = {}) {
  return {
    id: 'mockPasteId',
    createdAt: new Date('2000-01-01').toISOString(),
    updatedAt: new Date('2000-02-20').toISOString(),
    ...paste,
    files: (paste.files || []),
  };
}


test('If there are no pastes display message instead of CardDeck', () => {
  const wrapper = shallow(<CurrentUserPastes pastes={[]} />);
  expect(wrapper.exists(CardDeck)).toBe(false);
  expect(wrapper.exists('.no-pastes-message')).toBe(true);

  wrapper.setProps({ pastes: [createPaste()] });
  expect(wrapper.exists(CardDeck)).toBe(true);
  expect(wrapper.exists('.no-pastes-message')).toBe(false);
});
