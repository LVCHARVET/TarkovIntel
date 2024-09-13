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

  /**
   * Initialisation du composant. Charge les cartes, tags et colonnes à l'ouverture de la page.
   */
  ngOnInit() {
    this.loadCards();
    this.loadTags();
    this.loadColumns();
    this.editModal = new bootstrap.Modal(document.getElementById('editCardModal'));
    this.addCardModal = new bootstrap.Modal(document.getElementById('addCardModal'));
    this.addTagModal = new bootstrap.Modal(document.getElementById('addTagModal'));
    this.deleteCardModal = new bootstrap.Modal(document.getElementById('deleteCardModal'));
  }

  /**
    * Charge les cartes depuis le service `CardsService`.
    */
  loadCards() {
    this.cardsService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  /**
   * Charge les tags depuis le service `TagsService`.
   */
  loadTags() {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  /**
   * Charge les colonnes depuis le service `ColumnsService`.
   */
  loadColumns() {
    this.columnsService.getColumns().subscribe(columns => this.columns = columns);
  }

  /**
   * Filtre les cartes par tag.
   * @param {string} tagId - L'identifiant du tag sélectionné.
   */
  filterByTag(tagId: string) {
    this.selectedTag = tagId;
    this.filterCards();
  }

  /**
   * Filtre les cartes en fonction du tag sélectionné.
   */
  filterCards() {
    this.filteredCards = this.cards.filter(c =>
      c.tag === this.selectedTag || !this.selectedTag
    );
  }

  /**
   * Retourne les cartes correspondant à une colonne donnée.
   * @param {string} columnId - L'identifiant de la colonne.
   * @returns {Card[]} - Liste des cartes dans la colonne.
   */
  getCardsByColumn(columnId: string): Card[] {
    let filteredCards = this.cards.filter(card => card.column === columnId);

    if (this.selectedTag) {
      filteredCards = filteredCards.filter(card => card.tag === this.selectedTag);
    }
    return filteredCards;
  }

  /**
   * Affiche ou masque la réponse d'une carte.
   * @param {string} cardId - L'identifiant de la carte.
   */
  showAnswer(cardId: string) {
    this.showAnswerMap[cardId] = !this.showAnswerMap[cardId];
  }

  /**
   * Déplace une carte vers une colonne donnée.
   * @param {string} cardId - L'identifiant de la carte.
   * @param {string} columnId - L'identifiant de la nouvelle colonne.
   */
  moveCard(cardId: string, columnId: string) {
    this.cardsService.updateCardColumn(cardId, columnId).subscribe(() => this.loadCards());
  }

  /**
   * Déplace une carte vers la colonne à gauche.
   * @param {Card} card - La carte à déplacer.
   */
  moveCardLeft(card: Card) {
    const currentColumn = this.columns.find(c => c.id === card.column);
    if (currentColumn && currentColumn.order > 1) {
      const newColumn = this.columns.find(c => c.order === currentColumn.order - 1);
      if (newColumn) {
        this.moveCard(card.id, newColumn.id);
      }
    }
  }

  /**
   * Déplace une carte vers la colonne à droite.
   * @param {Card} card - La carte à déplacer.
   */
  moveCardRight(card: Card) {
    const currentColumn = this.columns.find(c => c.id === card.column);
    if (currentColumn && currentColumn.order < this.columns.length) {
      const newColumn = this.columns.find(c => c.order === currentColumn.order + 1);
      if (newColumn) {
        this.moveCard(card.id, newColumn.id);
      }
    }
  }

  /**
   * Ouvre la fenêtre modale pour l'édition d'une carte.
   * @param {Card} card - La carte à éditer.
   */
  openEditModal(card: Card) {
    this.editCardData = { ...card };
    this.editModal.show();
  }

  /**
   * Envoie les modifications de la carte et recharge les cartes.
   */
  submitEditCard() {
    if (this.editCardData.id) {
      this.cardsService.updateCard(this.editCardData.id, this.editCardData as Card).subscribe(() => {
        this.loadCards();
        this.editModal.hide();
      });
    }
  }

  /**
   * Prépare la suppression d'une carte en ouvrant la modale de confirmation.
   * @param {string} cardId - L'identifiant de la carte à supprimer.
   */
  prepareDeleteCard(cardId: string) {
    this.cardToDelete = cardId;
    this.deleteCardModal.show();
  }

  /**
   * Confirme et supprime la carte sélectionnée.
   */
  confirmDelete() {
    if (this.cardToDelete) {
      this.cardsService.deleteCard(this.cardToDelete).subscribe(() => {
        this.loadCards();
        this.cardToDelete = null;
        this.deleteCardModal.hide();
      });
    }
  }

  /**
   * Ouvre la fenêtre modale pour ajouter une nouvelle carte.
   */
  openAddCardModal() {
    this.newCard = {};
    this.addCardModal.show();
  }

  /**
   * Soumet la nouvelle carte et recharge la liste des cartes.
   */
  submitAddCard() {
    if (this.newCard.question && this.newCard.answer && this.newCard.column && this.newCard.tag) {
      this.cardsService.createCard(this.newCard as Card).subscribe(() => {
        this.loadCards();
        this.addCardModal.hide();
      });
    }
  }

  /**
   * Ouvre la fenêtre modale pour ajouter un nouveau tag.
   */
  openAddTagModal() {
    this.newTag = {};
    this.addTagModal.show();
  }

  /**
   * Soumet le nouveau tag et recharge la liste des tags.
   */
  submitAddTag() {
    if (this.newTag.label) {
      this.tagsService.createTag(this.newTag as Tag).subscribe(() => {
        this.loadTags();
        this.addTagModal.hide();
      });
    }
  }
  
  /**
   * Réinitialise la sélection de tag et redirige vers la page d'accueil.
   */
  goHome() {
    this.selectedTag = null;
    this.router.navigate(['/home']);
  }
}