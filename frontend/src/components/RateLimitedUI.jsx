import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-shrink-0 bg-amber-100 p-4 rounded-full">
            <ZapIcon className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Rate Limit Reached</h3>
            <p className="text-slate-700 mb-1">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-sm text-slate-600">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;