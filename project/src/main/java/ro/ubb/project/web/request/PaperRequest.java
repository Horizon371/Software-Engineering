package ro.ubb.project.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PaperRequest {
    private int paperId;
    private int authorId;
    private String paperTitle;
    private String keywords;
    private String fileName;
}
