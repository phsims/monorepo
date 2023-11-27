import { useState } from 'react';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

import { SubmitForm, FormData } from '@shared';
import { parseRecipe } from '../../utilities/parseRecipe';
import { Recipe } from '../../api/schemas';

export interface ImporterProps {
  onSubmit: (data: unknown) => void;
}

export function Importer({ onSubmit }: ImporterProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const fetchData = async (data: FormData) => {
    const { text } = data;

    fetch(text)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then((htmlContent) => {
        const parsedRecipe = parseRecipe(htmlContent);

        setRecipe(parsedRecipe);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };
  const submitFormProps = {
    inputProps: {
      label: 'URL',
      placeholder: 'Enter recipe URL',
    },
  };

  return (
    <>
      <div className="relative">
        <div className="mx-auto max-w-2xl bg-primary br-50 md:max-w-7xl mt-48 rounded-lg">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
            {/* COLUMN-1 */}
            <div className="col-span-7">
              <div className="m-10 lg:ml-32 lg:mt-20 lg:mb-20">
                <Fade
                  direction={'up'}
                  delay={400}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="text-lg font-normal text-white mb-3 ls-51">
                    RECIPE IMPORTER
                  </h3>
                </Fade>
                <Fade
                  direction={'up'}
                  delay={800}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="text-3xl md:text-5xl font-semibold text-white mb-8">
                    Import a recipe
                  </h3>
                </Fade>

                <div>
                  <Fade
                    direction={'up'}
                    delay={1200}
                    cascade
                    damping={1e-1}
                    triggerOnce={true}
                  >
                    <SubmitForm onSubmit={fetchData} {...submitFormProps} />
                  </Fade>
                </div>
              </div>
            </div>

            {/* COLUMN-2 */}
            <div className="col-span-5 relative hidden md:block">
              <div>
                <Image
                  src={'/images/Newsletter/soup.svg'}
                  alt="soup-image"
                  width={626}
                  height={602}
                  className="-mt-24"
                />
              </div>
              <div className="absolute top-[78%]">
                <Image
                  src={'/images/Newsletter/onion.svg'}
                  alt="onion-image"
                  width={300}
                  height={122}
                />
              </div>
              <div className="absolute top-[30%] right-[-23%] hidden lg:block">
                <Image
                  src={'/images/Newsletter/lec.svg'}
                  alt="lettuce-image"
                  width={300}
                  height={122}
                />
              </div>
              <div className="absolute bottom-[10%] left-[0%]">
                <Image
                  src={'/images/Newsletter/yellow.svg'}
                  alt="yellow-image"
                  width={59}
                  height={59}
                />
              </div>
              <div className="absolute bottom-[20%] right-[20%]">
                <Image
                  src={'/images/Newsletter/blue.svg'}
                  alt="blue-image"
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {recipe && (
        <>
          <p>{recipe?.name}</p>
          <p>{recipe?.description}</p>
        </>
      )}
    </>
  );
}

export default Importer;
