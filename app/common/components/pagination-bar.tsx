import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "~/common/components/ui/pagination";

interface PaginationBarProps {
  totalPages: number;
}

export function PaginationBar({ totalPages }: PaginationBarProps) {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") ?? 1);

  if (isNaN(page) || page < 1 || page > totalPages) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious to={`?page=${page - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to={`?page=${page - 1}`}>{page - 1}</PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink to={`?page=${page}`} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink to={`?page=${page + 1}`}>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to={`?page=${page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
