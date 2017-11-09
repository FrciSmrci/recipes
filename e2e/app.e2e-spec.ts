import { RecipePuppyPage } from './app.po';

describe('recipe-puppy App', () => {
  let page: RecipePuppyPage;

  beforeEach(() => {
    page = new RecipePuppyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
