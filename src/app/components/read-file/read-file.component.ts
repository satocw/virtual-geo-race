import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-read-file',
  templateUrl: './read-file.component.html',
  styleUrls: ['./read-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadFileComponent implements OnInit {
  private reader = new FileReader();

  @Output() readFile = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  handleFiles(files: FileList) {
    const file = files[0];
    this.reader.onload = () => {
      this.readFile.emit(this.reader.result);
    };
    this.reader.readAsText(file);
  }
}
