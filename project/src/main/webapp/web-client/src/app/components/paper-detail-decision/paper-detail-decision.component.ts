import {Component, OnInit} from '@angular/core';
import {PaperService} from '../../services/paper/paper.service';
import {Paper} from '../../model/paper';
import {AuthenticationService} from '../../services/login';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {ProgramCommitteeService} from '../../services/program-committee/program-committee.service';
import {ProgramCommittee} from '../../model/program-committee';
import {PcDto} from "../../model/pcdto";

@Component({
  selector: 'app-paper-detail-decision',
  templateUrl: './paper-detail-decision.component.html',
  styleUrls: ['./paper-detail-decision.component.css']
})
export class PaperDetailDecisionComponent implements OnInit {

  paper: Paper;
  id = +this.route.snapshot.paramMap.get('id');
  pcMembers: PcDto[] = [];
  reviewersMap: Map<number, boolean>;

  constructor(
    private route: ActivatedRoute,
    private paperService: PaperService,
    private location: Location,
    private router: Router,
    private sanitizer: DomSanitizer,
    private pcService: ProgramCommitteeService
  ) {
    this.reviewersMap = new Map<number, boolean>();
  }

  ngOnInit(): void {
    this.getPaper();
    this.getPcs();
  }

  acceptPaper() {
    this.paperService.acceptPaper(this.paper.pid);
  }

  rejectPaper() {
    this.paperService.rejectPaper(this.paper.pid);
  }

  sendPaperBack() {
    let reviewers = [];
    this.reviewersMap.forEach((value, key) => {
      if (value === true) {
        reviewers.push(key);
      }
    });
    if (reviewers.length !== 2 && reviewers.length !== 3) {
      window.alert('please choose 2 or 3 reviewers!');
      return;
    }
    this.paperService.reassignPaper(this.paper.pid, reviewers);
  }

  selectReviewer(id: number) {
    this.reviewersMap.set(id, !this.reviewersMap.get(id));
  }

  private getPaper() {
    this.paperService.getPaperById(this.id)
      .subscribe(paper => {
        this.paper = paper;
      });
  }

  private getPcs() {
    this.pcService.getProgramCommittees()
      .subscribe(pcs => {
        this.pcMembers = pcs;
      });
    this.pcMembers.forEach(pc => this.reviewersMap.set(pc.pcid, false));
  }
}
