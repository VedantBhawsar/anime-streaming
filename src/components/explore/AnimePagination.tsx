import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IAnimePagination {
  hasNextPage: boolean | undefined;
  currentPage: number | undefined;
  totalPages: number | undefined;
  refetch: () => void;
}

function AnimePagination({
  hasNextPage,
  currentPage,
  totalPages,
  refetch,
}: IAnimePagination) {
  const searchParams = useSearchParams();
  const genre = searchParams.get("q") || "action";
  const curPage = currentPage || 1;
  const totPages = totalPages || 1;
  const router = useRouter();
  const pathname = usePathname();

  function handlePageChange(page: number) {
    if (page < 1 || page > totPages) return;
    const newUrl = `${pathname}?q=${genre.split("?")[0]}&page=${page}`;
    router.push(newUrl);
    setTimeout(refetch, 100);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(curPage - 1)}
            isActive={curPage === 1}
          />
        </PaginationItem>

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink isActive>{curPage}</PaginationLink>
        </PaginationItem>

        {curPage + 1 <= totPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(curPage + 1)}>
              {curPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {curPage + 2 <= totPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(curPage + 2)}>
              {curPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {curPage + 2 < totPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {curPage + 2 < totPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(totPages)}>
              {totPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(curPage + 1)}
            isActive={!hasNextPage || curPage === totPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AnimePagination;
