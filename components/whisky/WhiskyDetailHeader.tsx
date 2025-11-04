import { Trophy, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WhiskyDetailHeaderProps } from '@/types/whisky';

const WhiskyDetailHeader = ({ whisky }: WhiskyDetailHeaderProps) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={
                            whisky.image ||
                            '/placeholder.svg?height=200&width=200'
                        }
                        alt={whisky.name}
                        className="h-48 w-48 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold">
                                    {whisky.name}
                                </h2>
                                {whisky.quaich && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100"
                                    >
                                        Quaich
                                    </Badge>
                                )}
                            </div>
                            <p className="text-lg text-muted-foreground">
                                {whisky.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                <span>Tasting Order: #{whisky.order}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WhiskyDetailHeader;
