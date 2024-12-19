"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Osh, esqueceu o próprio nome?!",
  }),
  answerOne: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
  answerTwo: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
  answerThree: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
  answerFour: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
  answerFive: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
  answerSix: z.string().min(5, {
    message: "não seja preguiçoso, escreva mais aí",
  }),
});

const questions = [
  {
    value: "nome",
    label: "Primeiramente, qual é o seu nome?",
    placeholder: "Escreva seu belo nome aqui... e se não for belo, entenda que a culpa não é sua :)",
  },
  {
    value: "answerOne",
    label: "Se um pinguim aparecesse na sua porta e pedisse para ser seu amigo, o que você faria?",
    placeholder: "Aliás tem uma piada de pinguim bem boa...",
  },
  {
    value: "answerTwo",
    label: "Qual frase você escreveria em sua lápide?",
    placeholder: "Conversa de bar, nós vemos por aqui...",
  },
  {
    value: "answerThree",
    label: "Se você tivesse que escolher um novo transporte para ir ao trabalho, qual seria?",
    placeholder: "Não vale dizer que seria um girassol canibal. Clássico.",
  },
  {
    value: "answerFour",
    label: "Se você fosse convidado para um jantar com extraterrestres, o que levaria?",
    placeholder: "Eu me levaria e é isso que importa. Ah, pera. A pergunta não é pra mim.",
  },
  {
    value: "answerFive",
    label: "Se você estivesse preso em uma ilha deserta com apenas 3 itens, o que escolheria e por quê?",
    placeholder: "Caraca, alguém me contrata como recrutadora.",
  },
  {
    value: "answerSix",
    label: "Se você tivesse que escolher uma música para tocar no seu funeral, qual seria?",
    placeholder: "Estou vendo muitas perguntas relacionadas com morte, preocupante?",
  },
];

export default function FormPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      answerOne: "",
      answerTwo: "",
      answerThree: "",
      answerFour: "",
      answerFive: "",
      answerSix: ""
    },
  });

  const { control, watch, trigger } = form;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Obrigada, recebi aqui o e-mail 🚀",
          action: (
            <ToastAction
              onClick={() => {
                window.open(
                  "https://open.spotify.com/playlist/6RH04MMkLFSC34ILFiIB6H?si=93b7e83789284c6c",
                  "_blank"
                );
              }}
              altText="Redirecionamento para uma playlist"
            >
              Que tal uma playlist?
            </ToastAction>
          ),
          className: "bg-pink-600 hover:bg-pink-500",
        });

        form.reset();
        router.push("/");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Erro ao enviar o email.");
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: (err as Error).message,
        className: "bg-red-500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(
      questions[currentQuestionIndex].value as keyof typeof formSchema.shape
    );
    if (isValid) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentValue = watch(
    questions[currentQuestionIndex].value as keyof typeof formSchema.shape
  );

  const isNextDisabled = !currentValue?.trim();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full lg:h-screen flex flex-col mt-20 lg:mt-0 items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[500px] lg:w-[700px] flex flex-col gap-4 p-4 mt-4"
        >
          {questions.map(
            (question, index) =>
              index === currentQuestionIndex && (
                <FormField
                  key={question.value}
                  control={control}
                  name={question.value as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-lg font-mono text-pink-600">
                        {question.label}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="text-pink-100 placeholder:text-gray-400"
                          placeholder={question.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
          )}
          <div className="mt-2 flex flex-col-reverse gap-3 lg:flex-row lg:justify-between">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isLoading}
              variant="secondary"
            >
              Voltar
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                type="button"
                disabled={isNextDisabled || isLoading}
                onClick={handleNext}
                className="bg-pink-600 hover:bg-pink-500"
              >
                Próxima
              </Button>
            ) : (
              <Button
                className="bg-pink-600 hover:bg-pink-500"
                disabled={isNextDisabled || isLoading}
                type="submit"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
