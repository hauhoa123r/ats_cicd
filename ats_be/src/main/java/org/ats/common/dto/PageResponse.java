package org.ats.common.dto;

import lombok.*;

import java.util.List;

@Setter@Getter@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private Integer totalPages;
    private Integer currentPage;
    private List<T> content;
}
