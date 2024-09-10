// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from '../../interfaces/card';
import { Column } from '../../interfaces/column';
import { Tag } from '../../interfaces/tag';
import { CardsService } from '../../services/cards.service';
import { TagsService } from '../../services/tags.service';
import { ColumnsService } from '../../services/columns.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];
  tags: Tag[] = [];
  columns: Column[] = []; 
  selectedTag: string | null = null;
  showAnswerMap: { [key: string]: boolean } = {};
  editCardData: Partial<Card> = {};
  cardToDelete: string | null = null;
  newCard: Partial<Card> = {};
  newTag: Partial<Tag> = {}; 

  private editModal: any; 
  private addCardModal: any; 
  private addTagModal: any;
  private deleteCardModal: any;

  constructor(
    private cardsService: CardsService,
    private tagsService: TagsService,
    private columnsService: ColumnsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCards();
    this.loadTags();
    this.loadColumns();
    this.editModal = new bootstrap.Modal(document.getElementById('editCardModal'));
    this.addCardModal = new bootstrap.Modal(document.getElementById('addCardModal'));
    this.addTagModal = new bootstrap.Modal(document.getElementById('addTagModal'));
    this.deleteCardModal = new bootstrap.Modal(document.getElementById('deleteCardModal'));
  }

  loadCards() {
    this.cardsService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  loadTags() {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  loadColumns() {
    this.columnsService.getColumns().subscribe(columns => this.columns = columns);
  }

  filterByTag(tagId: string) {
    this.selectedTag = tagId;
    this.filterCards();
  }

  filterCards() {
    this.filteredCards = this.cards.filter(c =>
      c.tag === this.selectedTag || !this.selectedTag
    );
  }

  getCardsByColumn(columnId: string): Card[] {
    let filteredCards = this.cards.filter(card => card.column === columnId);

    if (this.selectedTag) {
      filteredCards = filteredCards.filter(card => card.tag === this.selectedTag);
    }
    return filteredCards;
  }

  showAnswer(cardId: string) {
    this.showAnswerMap[cardId] = !this.showAnswerMap[cardId];
  }

  moveCard(cardId: string, columnId: string) {
    this.cardsService.updateCardColumn(cardId, columnId).subscribe(() => this.loadCards());
  }

  moveCardLeft(card: Card) {
    const currentColumn = this.columns.find(c => c.id === card.column);
    if (currentColumn && currentColumn.order > 1) {
      const newColumn = this.columns.find(c => c.order === currentColumn.order - 1);
      if (newColumn) {
        this.moveCard(card.id, newColumn.id);
      }
    }
  }

  moveCardRight(card: Card) {
    const currentColumn = this.columns.find(c => c.id === card.column);
    if (currentColumn && currentColumn.order < this.columns.length) {
      const newColumn = this.columns.find(c => c.order === currentColumn.order + 1);
      if (newColumn) {
        this.moveCard(card.id, newColumn.id);
      }
    }
  }

  openEditModal(card: Card) {
    this.editCardData = { ...card };
    this.editModal.show();
  }

  submitEditCard() {
    if (this.editCardData.id) {
      this.cardsService.updateCard(this.editCardData.id, this.editCardData as Card).subscribe(() => {
        this.loadCards();
        this.editModal.hide();
      });
    }
  }

  prepareDeleteCard(cardId: string) {
    this.cardToDelete = cardId;
    this.deleteCardModal.show();
  }

  confirmDelete() {    
    if (this.cardToDelete) {
      this.cardsService.deleteCard(this.cardToDelete).subscribe(() => {
        this.loadCards();
        this.cardToDelete = null;
        this.deleteCardModal.hide();
      });
    }
  }

  openAddCardModal() {
    this.newCard = {};
    this.addCardModal.show();
  }

  submitAddCard() {
    if (this.newCard.question && this.newCard.answer && this.newCard.column && this.newCard.tag) {
      this.cardsService.createCard(this.newCard as Card).subscribe(() => {
        this.loadCards();
        this.addCardModal.hide();
      });
    }
  }

  openAddTagModal() {
    this.newTag = {};
    this.addTagModal.show();
  }

  submitAddTag() {
    if (this.newTag.label) {
      this.tagsService.createTag(this.newTag as Tag).subscribe(() => {
        this.loadTags();
        this.addTagModal.hide();
      });
    }
  }

  goHome() {
    this.selectedTag = null;
    this.router.navigate(['/home']);
  }
}