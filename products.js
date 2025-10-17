// Enhanced EPS Products data in Georgian with realistic specifications
const products = [
  {
    id: 1,
    name: "ეპს იზოლაციური ფირფიტა PSE-R 50მმ",
    description:
      "მაღალი ხარისხის თერმოიზოლაციური ფირფიტა კედლების ფასადური იზოლაციისთვის. შეესაბამება EN 13163 სტანდარტს.",
    price: 12.5,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI5MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2ZyB4PSI5MCIgeT0iNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMGVhNWU5Ij4KPHA+dGg+SG9tZTwvdGg+PC9wPgo8L3N2Zz4KPHRleHQgeD0iMTAwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwZWE1ZTkiIGZvbnQtc2l6ZT0iMTIiPjUwbW0gRVBTPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      thickness: "50მმ",
      density: "15 კგ/მ³",
      thermalConductivity: "0.038 W/mK",
      compressiveStrength: "100 კპა",
      dimensions: "1000x500მმ",
    },
    applications: [
      "ფასადის იზოლაცია",
      "კედლების იზოლაცია",
      "ბალკონის იზოლაცია",
    ],
  },
  {
    id: 2,
    name: "ეპს იზოლაციური ფირფიტა PSE-R 100მმ",
    description:
      "სქელი იზოლაციური ფირფიტა მაღალი ეფექტურობის თერმოიზოლაციისთვის. იდეალურია ენერგოეფექტური შენობებისთვის.",
    price: 24.8,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjE1IiB5PSIyNSIgd2lkdGg9IjE3MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwZWE1ZTkiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIj4xMDBtbTwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjcyODAiIGZvbnQtc2l6ZT0iMTIiPkVQUyBJbnN1bGF0aW9uPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      thickness: "100მმ",
      density: "15 კგ/მ³",
      thermalConductivity: "0.038 W/mK",
      compressiveStrength: "100 კპა",
      dimensions: "1000x500მმ",
    },
    applications: [
      "ღია ფასადის იზოლაცია",
      "სახურავის იზოლაცია",
      "ენერგოეფექტური შენობები",
    ],
  },
  {
    id: 3,
    name: "ეპს შეფუთვის ბლოკები",
    description:
      "მსუბუქი და დამცავი შეფუთვის ბლოკები ელექტრონიკისა და ნაზი ნივთების უსაფრთხო ტრანსპორტირებისთვის.",
    price: 8.5,
    category: "packaging",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjMwIiB5PSI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSI3MCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMTEwIiB5PSI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMiI+UGFja2FnaW5nIEJsb2NrczwvdGV4dD4KPC9zdmc+",
    inStock: true,
    specifications: {
      density: "12 კგ/მ³",
      shockAbsorption: "მაღალი",
      waterResistance: "შესანიშნავი",
      customSizes: "ხელმისაწვდომი",
    },
    applications: [
      "ელექტრონიკის შეფუთვა",
      "მედიცინის ხელსაწყოები",
      "ნაზი ნივთების დაცვა",
    ],
  },
  {
    id: 4,
    name: "ეპს ფუნდამენტის იზოლაცია XPS",
    description:
      "მაღალი სიმტკიცის ეპს ფირფიტები ფუნდამენტის, სარდაფისა და მიწისქვეშა კონსტრუქციების იზოლაციისთვის.",
    price: 32.0,
    category: "construction",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSI4MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzM5MzMzMyIvPgo8cmVjdCB4PSIyMCIgeT0iNDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwZWE1ZTkiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Gb3VuZGF0aW9uIEVQUzwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjcyODAiIGZvbnQtc2l6ZT0iMTAiPkdyb3VuZCBJbnN1bGF0aW9uPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      thickness: "80მმ",
      density: "30 კგ/მ³",
      compressiveStrength: "300 კპა",
      waterAbsorption: "<1%",
      dimensions: "1200x600მმ",
    },
    applications: [
      "ფუნდამენტის იზოლაცია",
      "სარდაფის კედლები",
      "მიწისქვეშა კონსტრუქციები",
    ],
  },
  {
    id: 5,
    name: "ეპს სახურავის იზოლაცია EPS 200",
    description:
      "სახურავის იზოლაციისთვის განკუთვნილი მაღალი ხარისხის ეპს ფირფიტები ცეცხლსაწინააღმდეგო დანამატებით.",
    price: 18.75,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+Cjxwb2x5Z29uIHBvaW50cz0iMjAsMTIwIDEwMCwyMCAxODAsMTIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlZjQ0NDQiIHN0cm9rZS13aWR0aD0iMyIvPgo8cmVjdCB4PSIzMCIgeT0iMTAwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjExNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzBlYTVlOSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlJvb2YgRVBTPC90ZXh0Pgo8dGV4dCB4PSIxMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMCI+RmlyZSBSZXNpc3RhbnQ8L3RleHQ+Cjwvc3ZnPg==",
    inStock: true,
    specifications: {
      thickness: "60მმ",
      density: "20 კგ/მ³",
      thermalConductivity: "0.037 W/mK",
      fireClass: "E კლასი",
      dimensions: "1000x500მმ",
    },
    applications: ["სახურავის იზოლაცია", "მანსარდის იზოლაცია", "ფლატ სახურავი"],
  },
  {
    id: 6,
    name: "ეპს დეკორატიული პროფილები",
    description:
      "ფასადის დეკორატიული ელემენტები - კარნიზები, პილასტრები, ბაგეტები ეპს მასალისგან აკრილის საფარით.",
    price: 15.2,
    category: "construction",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMzAiIHk9IjcwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSI0MCIgeT0iOTUiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3MjgwIiBmb250LXNpemU9IjEyIj5EZWNvcmF0aXZlIFByb2ZpbGVzPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      density: "22 კგ/მ³",
      surface: "აკრილის საფარი",
      coating: "UV დაცული",
      customLength: "მომხმარებლის მიხედვით",
    },
    applications: ["ფასადის დეკორაცია", "კარნიზები", "ბაგეტები", "პილასტრები"],
  },
  {
    id: 7,
    name: "ეპს იატაკის ქვეშ იზოლაცია EPS 300",
    description:
      "მაღალი სიმტკიცის ეპს ფირფიტები იატაკის ქვეშ იზოლაციისთვის. გამოიყენება თბილი იატაკის სისტემებთან ერთად.",
    price: 28.9,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSI5MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB4PSIyMCIgeT0iNzAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iODAiIHI9IjMiIGZpbGw9IiNlZjQ0NDQiLz4KPGNpcmNsZSBjeD0iNjAiIGN5PSI4MCIgcj0iMyIgZmlsbD0iI2VmNDQ0NCIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjgwIiByPSIzIiBmaWxsPSIjZWY0NDQ0Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwZWE1ZTkiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj5GbG9vciBJbnN1bGF0aW9uPC90ZXh0Pgo8dGV4dCB4PSIxMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMCI+SGVhdGluZyBTeXN0ZW08L3RleHQ+Cjwvc3ZnPg==",
    inStock: false,
    specifications: {
      thickness: "50-100მმ",
      density: "35 კგ/მ³",
      compressiveStrength: "300 კპა",
      thermalConductivity: "0.036 W/mK",
      dimensions: "1000x500მმ",
    },
    applications: [
      "იატაკის ქვეშ იზოლაცია",
      "თბილი იატაკი",
      "ინდუსტრიული იატაკები",
    ],
  },
  {
    id: 8,
    name: "ეპს სპეციალური ფორმები CNC",
    description:
      "CNC მანქანებით დამზადებული სპეციალური ფორმის ეპს პროდუქტები ინდივიდუალური პროექტებისთვის.",
    price: 45.0,
    category: "packaging",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxwYXRoIGQ9Ik01MCA2MEM1MCA0MCA3MCAyMCA5MCAyMEMxMTAgMjAgMTMwIDQwIDEzMCA2MEMxMzAgODAgMTEwIDEwMCA5MCAxMDBDNzAgMTAwIDUwIDgwIDUwIDYwWiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjMiLz4KPHN2ZyB4PSI4NSIgeT0iNTUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+CjxwYXRoIGQ9Ik0yIDJMOCA4TTggMkwyIDgiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMiI+Q3VzdG9tIFNoYXBlczwvdGV4dD4KPC9zdmc+",
    inStock: true,
    specifications: {
      customSize: "მომხმარებლის მიხედვით",
      density: "15-35 კგ/მ³",
      tolerance: "±0.5მმ",
      maxDimensions: "3000x2000x1000მმ",
    },
    applications: [
      "სპეციალური შეფუთვა",
      "ინდუსტრიული ფორმები",
      "არქიტექტურული ელემენტები",
    ],
  },
  {
    id: 9,
    name: "ეპს გეოფომი EPS Geofoam",
    description:
      "მსუბუქი ნაპირსამაგრი მასალა გზების, ხიდებისა და ნაგებობების ქვეშ. ამცირებს ზეწოლას ნიადაგზე.",
    price: 22.3,
    category: "construction",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSI4MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB4PSIyMCIgeT0iNjAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0yMCA4MEM0MCA3MCA2MCA3MCA4MCA4MEMxMDAgNzAgMTIwIDcwIDE0MCA4MEMxNjAgNzAgMTgwIDcwIDIwMCA4MCIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KPHR4dCB4PSIxMDAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMGVhNWU5IiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+R2VvZm9hbTwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjcyODAiIGZvbnQtc2l6ZT0iMTAiPlJvYWQgQ29uc3RydWN0aW9uPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      density: "18 კგ/მ³",
      compressiveStrength: "150 კპა",
      application: "გზების მშენებლობა",
      dimensions: "2000x1000x500მმ",
    },
    applications: [
      "გზების მშენებლობა",
      "ხიდების ნაპირსამაგრი",
      "მიწის ზეწოლის შემცირება",
    ],
  },
  {
    id: 10,
    name: "ეპს ბალკონის იზოლაცია EPS 150",
    description:
      "ბალკონისა და ლოჯიის იზოლაციისთვის განკუთვნილი ეპს ფირფიტები ნესტის წინააღმდეგ დამცავი თვისებებით.",
    price: 16.4,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjMwIiB5PSI0MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjMiLz4KPHJlY3QgeD0iNDAiIHk9IjUwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSI1NSIgY3k9IjY1IiByPSIzIiBmaWxsPSIjMGVhNWU5Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjUiIHI9IjMiIGZpbGw9IiMwZWE1ZTkiLz4KPGNpcmNsZSBjeD0iOTUiIGN5PSI2NSIgcj0iMyIgZmlsbD0iIzBlYTVlOSIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMiI+QmFsY29ueSBJbnN1bGF0aW9uPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      thickness: "30-50მმ",
      density: "25 კგ/მ³",
      moistureResistance: "შესანიშნავი",
      thermalConductivity: "0.038 W/mK",
      dimensions: "1000x500მმ",
    },
    applications: [
      "ბალკონის იზოლაცია",
      "ლოჯიის იზოლაცია",
      "პატარა სივრცეების იზოლაცია",
    ],
  },
  {
    id: 11,
    name: "ეპს ცეცხლსაწინააღმდეგო EPS-FR",
    description:
      "ცეცხლსაწინააღმდეგო დანამატებით ეპს იზოლაციური მასალა საზოგადოებრივი შენობებისთვის. HBCD-ის გარეშე.",
    price: 35.6,
    category: "insulation",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjMwIiB5PSI0MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZWY0NDQ0IiBzdHJva2Utd2lkdGg9IjMiLz4KPHN2ZyB4PSI5MCIgeT0iNjUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZWY0NDQ0Ij4KPHA+dGg+RmlyZTwvdGg+PC9wPgo8L3N2Zz4KPHR4dCB4PSIxMDAiIHk9IjMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZWY0NDQ0IiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RmlyZSBSZXNpc3RhbnQ8L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3MjgwIiBmb250LXNpemU9IjEwIj5FY28tRnJpZW5kbHkgRm9ybXVsYTwvdGV4dD4KPC9zdmc+",
    inStock: true,
    specifications: {
      thickness: "50-100მმ",
      density: "20 კგ/მ³",
      fireClass: "E კლასი",
      flameRetardant: "HBCD-ის გარეშე",
      thermalConductivity: "0.038 W/mK",
    },
    applications: [
      "საზოგადოებრივი შენობები",
      "სკოლები და საავადმყოფოები",
      "ოფისები",
    ],
  },
  {
    id: 12,
    name: "ეპს აკვაკულტურის ფლოტები",
    description:
      "აკვაკულტურისა და თევზის ფერმებისთვის განკუთვნილი ეპს ფლოტაციური ელემენტები UV დაცვით.",
    price: 19.8,
    category: "packaging",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmYWZjIi8+CjxyZWN0IHg9IjIwIiB5PSI4MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzBmYjJmMSIgb3BhY2l0eT0iMC4zIi8+CjxlbGxpcHNlIGN4PSI2MCIgY3k9IjcwIiByeD0iMzAiIHJ5PSIxNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjIiLz4KPGVsbGlwc2UgY3g9IjE0MCIgY3k9IjcwIiByeD0iMzAiIHJ5PSIxNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2ZyB4PSI5NSIgeT0iNjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+CjxwYXRoIGQ9Ik0yIDJDMiA2IDYgMTAgMTAgMTAiIHN0cm9rZT0iIzBmYjJmMSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1zaXplPSIxMiI+QXF1YWN1bHR1cmUgRmxvYXRzPC90ZXh0Pgo8L3N2Zz4=",
    inStock: true,
    specifications: {
      density: "15 კგ/მ³",
      waterAbsorption: "<2%",
      buoyancy: "მაღალი",
      uvResistance: "შესანიშნავი",
      lifespan: "15+ წელი",
    },
    applications: [
      "აკვაკულტურა",
      "თევზის ფერმები",
      "მარინა ფლოტები",
      "წყლის სპორტი",
    ],
  },
];

// Export products for use in other files
window.productsData = products;
