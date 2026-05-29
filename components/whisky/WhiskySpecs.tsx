import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { hasWhiskySpecs } from '@/lib/whisky';

type WhiskySpecsProps = {
    age?: number | null;
    nas?: boolean;
    abv?: number | null;
    className?: string;
};

const WhiskySpecs = ({ age, nas, abv, className }: WhiskySpecsProps) => {
    if (!hasWhiskySpecs(age, abv, nas)) return null;

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {nas ? (
                <Badge variant="secondary">NAS</Badge>
            ) : (
                age != null && (
                    <Badge variant="secondary">
                        {age} {age === 1 ? 'year' : 'years'}
                    </Badge>
                )
            )}
            {abv != null && (
                <Badge variant="secondary">{abv.toFixed(1)}% ABV</Badge>
            )}
        </div>
    );
};

export default WhiskySpecs;
