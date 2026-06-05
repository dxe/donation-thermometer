import "react";

// The `part` attribute (for Shadow DOM ::part() styling) isn't in this version
// of @types/react yet, so add it to every element's allowed attributes.
declare module "react" {
	interface HTMLAttributes<T> {
		part?: string;
	}
}
