import { Component } from '@angular/core';
import { NewsPage } from './news';

@Component({
    templateUrl: 'news-wrapper.html'
})
export class NewsWrapperPage {
    rootPage = NewsPage;
}
