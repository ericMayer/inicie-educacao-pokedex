import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';

import { RequestState } from '@shared/enums/request-state.enum';

import lottie from 'lottie-web';

@Component({
  selector: 'app-request-state',
  templateUrl: './request-state.component.html',
  styleUrls: ['./request-state.component.scss']
})
export class RequestStateComponent implements OnInit {
  @Input({ required: true }) public requestState: RequestState;

  @ViewChild('animationLottie') public animationLottie: ElementRef<HTMLDivElement>;

  public title: string;
  public subtitle: string;
  public showRequestState: boolean;

  constructor(private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.setStateValues();
  }

  private setStateValues(): void {
    if (this.requestState === RequestState.Empty)
      this.setMessageRequestStatus('Sem resultados', 'Não foi encontrado nenhum resultado para sua busca 😢.', 'assets/animations/request-empty.json');
    else if (this.requestState === RequestState.Error)
      this.setMessageRequestStatus('Ops...', 'Desculpe, não foi possível carregar as informações 😢.Por favor tente novamente.', 'assets/animations/request-error.json');
    else
      this.showRequestState = false;
  }

  private setMessageRequestStatus(title: string, subtitle: string, pathAnimation: string): void {
    this.showRequestState = true;
    this.cd.detectChanges();

    this.title = title;
    this.subtitle = subtitle;

    lottie.setSpeed(1.5);

    lottie.loadAnimation({
      container: this.animationLottie?.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: pathAnimation,
    });
  }
}
