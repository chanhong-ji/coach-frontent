import { Button } from "~/common/components/ui/button";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/common/components/ui/tooltip";
import { Form } from "react-router";

const ADVICE_REQUEST_KEY = "last-advice-request-time";
const COOLDOWN_MINUTES = 3;

export interface AiRequestButtonProps {
  className?: string;
  lastAdviceRequestTime?: string | null;
}

export function AiRequestButton({ className, lastAdviceRequestTime }: AiRequestButtonProps) {
  const [isInCooldown, setIsInCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const checkCooldown = () => {
      if (typeof window === "undefined") return;
      const lastRequestTime = localStorage.getItem(ADVICE_REQUEST_KEY);
      if (!lastRequestTime) {
        setIsInCooldown(false);
        setRemainingTime("");
        return;
      }
      const lastRequest = DateTime.fromISO(lastRequestTime);
      const cooldownEnd = lastRequest.plus({ minutes: COOLDOWN_MINUTES });
      const now = DateTime.now();
      if (now < cooldownEnd) {
        setIsInCooldown(true);
        const diff = cooldownEnd.diff(now, ["minutes", "seconds"]);
        const minutes = Math.floor(diff.minutes);
        const seconds = Math.floor(diff.seconds);
        setRemainingTime(`${minutes}분 ${seconds}초`);
      } else {
        setIsInCooldown(false);
        setRemainingTime("");
        localStorage.removeItem(ADVICE_REQUEST_KEY);
      }
    };
    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = DateTime.now().toFormat("yyyy-MM-dd");
  const periodCanRequest = lastAdviceRequestTime == null || lastAdviceRequestTime < todayStr;
  const canRequest = periodCanRequest && !isInCooldown;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="absolute right-0 top-0 m-4 inline-flex" tabIndex={0}>
          <Form method="post">
            <Button size="sm" disabled={!canRequest} className={className ?? "cursor-pointer"} type="submit">
              AI 조언 요청
            </Button>
          </Form>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {isInCooldown
          ? `AI 조언 요청은 ${remainingTime} 후에 다시 가능합니다.`
          : !periodCanRequest
            ? "AI 조언 요청은 이전 조언 기간이 종료된 후에만 가능합니다."
            : "새로운 AI 조언을 요청합니다."}
      </TooltipContent>
    </Tooltip>
  );
}
